import assert from "node:assert/strict";
import {
  getWebBlockDefinition,
  validateWebBlock,
  webBlockRegistry,
} from "@ayobqorban/numu-web-components/registry";

assert.equal(webBlockRegistry.length, 4, "The published registry must contain the four foundation blocks.");

const hero = getWebBlockDefinition("hero.basic", 1);
assert.ok(hero, "hero.basic@1 must be available.");
assert.equal(
  validateWebBlock({ type: "hero.basic", version: 1, props: hero.defaultProps }).success,
  true,
  "Valid defaults must pass runtime validation.",
);
const invalidProps = validateWebBlock({ type: "hero.basic", version: 1, props: {} });
assert.equal(invalidProps.success, false);
assert.equal(invalidProps.code, "invalid-props");

const unknownBlock = validateWebBlock({ type: "unknown.block", version: 1, props: {} });
assert.equal(unknownBlock.success, false);
assert.equal(unknownBlock.code, "unknown-block");

const unsupportedVersion = validateWebBlock({ type: "hero.basic", version: 99, props: {} });
assert.equal(unsupportedVersion.success, false);
assert.equal(unsupportedVersion.code, "unsupported-version");

console.log("Registry runtime validation passed for valid and invalid page data.");
