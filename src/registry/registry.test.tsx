import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { getWebBlockDefinition, renderWebBlock, validateWebBlock, webBlockRegistry } from "./registry";

describe("webBlockRegistry", () => {
  it("contains four unique definitions whose defaults validate", () => {
    expect(webBlockRegistry).toHaveLength(4);
    const ids = webBlockRegistry.map((definition) => `${definition.key}@${definition.version}`);
    expect(new Set(ids).size).toBe(ids.length);
    for (const definition of webBlockRegistry) {
      expect(definition.propsSchema.safeParse(definition.defaultProps).success).toBe(true);
    }
  });

  it("looks up exact versions", () => {
    expect(getWebBlockDefinition("hero.basic", 1)?.component).toBeDefined();
    expect(getWebBlockDefinition("hero.basic", 2)).toBeUndefined();
  });

  it.each([
    [{ type: "missing.block", version: 1, props: {} }, "unknown-block"],
    [{ type: "hero.basic", version: 99, props: {} }, "unsupported-version"],
    [{ type: "hero.basic", version: 1, props: {} }, "invalid-props"],
    [{ type: "hero.basic", version: 1 }, "invalid-envelope"],
  ] as const)("returns a safe validation failure", (input, code) => {
    expect(validateWebBlock(input)).toMatchObject({ success: false, code });
  });

  it("renders a validated block and preserves its id", () => {
    const definition = getWebBlockDefinition("hero.basic", 1);
    expect(definition).toBeDefined();
    const result = renderWebBlock({
      id: "block-1",
      type: "hero.basic",
      version: 1,
      props: definition?.defaultProps,
    });
    expect(result.validation.success).toBe(true);
    expect(result.id).toBe("block-1");
    render(result.node);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("uses a caller-owned fallback without throwing", () => {
    const onError = vi.fn();
    const result = renderWebBlock(
      { type: "unknown", version: 1, props: {} },
      { fallback: <p>Unavailable block</p>, onError },
    );
    render(result.node);
    expect(screen.getByText("Unavailable block")).toBeInTheDocument();
    expect(onError).toHaveBeenCalledOnce();
  });
});
