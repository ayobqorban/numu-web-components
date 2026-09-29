import assert from "node:assert/strict";
import {
  getWebBlockDefinition,
  validateWebBlock,
  webBlockRegistry,
} from "@ayobqorban/numu-web-components/registry";

assert.equal(webBlockRegistry.length, 9, "The published registry must contain the four page blocks and five layout blocks.");

for (const key of [
  "layout.brand",
  "layout.navigation",
  "layout.heading",
  "layout.image",
  "layout.icon-link",
]) {
  const definition = getWebBlockDefinition(key, 1);
  assert.ok(definition, `${key}@1 must be available.`);
  assert.equal(
    validateWebBlock({ type: key, version: 1, props: definition.defaultProps }).success,
    true,
    `${key}@1 defaults must pass runtime validation.`,
  );
}

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
