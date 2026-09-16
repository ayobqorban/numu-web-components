import { execFileSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const npmCliPath = process.env.npm_execpath;
if (!npmCliPath) {
  throw new Error("Run this verifier through an npm script so npm_execpath is available.");
}
const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const exampleDirectory = join(repositoryRoot, "examples", "next-consumer");
const packageManifest = JSON.parse(readFileSync(join(repositoryRoot, "package.json"), "utf8"));
const packageName = packageManifest.name;
const packageVersion = packageManifest.version;
if (typeof packageName !== "string" || !packageName.startsWith("@") || !packageName.includes("/")) {
  throw new Error("The package must use a scoped npm name.");
}
const packageScope = packageName.split("/")[0];
const packagePathParts = packageName.split("/");
const temporaryRoot = mkdtempSync(join(tmpdir(), "numu-web-components-consumer-"));
const consumerDirectory = join(temporaryRoot, "consumer");
const usePublishedPackage = process.argv.includes("--published");

function run(args, cwd) {
  execFileSync(process.execPath, [npmCliPath, ...args], {
    cwd,
    env: process.env,
    stdio: "inherit",
  });
}

function assertTemporaryPath(path) {
  const resolvedTemporaryRoot = realpathSync(temporaryRoot);
  const candidate = resolve(path);
  const distance = relative(resolvedTemporaryRoot, candidate);
  if (distance.startsWith("..") || distance === "") {
    throw new Error(`Refusing to clean an unexpected path: ${candidate}`);
  }
}

try {
  cpSync(exampleDirectory, consumerDirectory, { recursive: true });
  const consumerManifestPath = join(consumerDirectory, "package.json");
  const consumerManifest = JSON.parse(readFileSync(consumerManifestPath, "utf8"));
  if (consumerManifest.dependencies[packageName] !== packageVersion) {
    throw new Error("The consumer must pin the current package version exactly.");
  }

  if (usePublishedPackage) {
    const token = process.env.NODE_AUTH_TOKEN;
    if (!token) {
      throw new Error("NODE_AUTH_TOKEN with read:packages is required for the published-package test.");
    }
    writeFileSync(
      join(consumerDirectory, ".npmrc"),
      `${packageScope}:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${token}\nalways-auth=true\n`,
      { encoding: "utf8", mode: 0o600 },
    );
  } else {
    run(["run", "build"], repositoryRoot);
    const packOutput = execFileSync(
      process.execPath,
      [npmCliPath, "pack", "--json", "--pack-destination", temporaryRoot],
      { cwd: repositoryRoot, encoding: "utf8" },
    );
    const packResult = JSON.parse(packOutput);
    const filename = packResult[0]?.filename;
    if (!filename) throw new Error("npm pack did not return a tarball filename.");
    consumerManifest.dependencies[packageName] = `file:../${filename}`;
    writeFileSync(consumerManifestPath, `${JSON.stringify(consumerManifest, null, 2)}\n`, "utf8");
  }

  run(["install", "--no-audit", "--no-fund"], consumerDirectory);
  run(["run", "typecheck"], consumerDirectory);
  run(["run", "verify:registry"], consumerDirectory);
  run(["run", "build"], consumerDirectory);
  run(["ls", packageName, "react", "react-dom"], consumerDirectory);

  const installedManifest = JSON.parse(
    readFileSync(join(consumerDirectory, "node_modules", ...packagePathParts, "package.json"), "utf8"),
  );
  if (installedManifest.version !== packageVersion) {
    throw new Error(`Installed package version mismatch: ${installedManifest.version}`);
  }

  console.log(
    `Next.js consumer verification passed using ${usePublishedPackage ? "GitHub Packages" : "a local tarball"}.`,
  );
} finally {
  if (process.env.KEEP_NUMU_CONSUMER_TEMP === "1") {
    console.log(`Kept consumer test directory: ${temporaryRoot}`);
  } else {
    assertTemporaryPath(consumerDirectory);
    rmSync(temporaryRoot, { recursive: true, force: true });
  }
}
