import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { webBlockManifest } from "../dist/registry.js";

const packageJson = JSON.parse(await readFile(resolve("package.json"), "utf8"));
const manifest = {
  package: packageJson.name,
  packageVersion: packageJson.version,
  ...webBlockManifest,
};

await writeFile(resolve("dist/manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
