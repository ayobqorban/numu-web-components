import { describe, expect, it } from "vitest";
import { numuThemeTokens, themeToCssVariables } from "./tokens";

describe("theme contract", () => {
  it("exposes a finite semantic token list", () => {
    expect(numuThemeTokens).toContain("--numu-web-color-primary");
    expect(numuThemeTokens).toContain("--numu-web-font-heading");
    expect(new Set(numuThemeTokens).size).toBe(numuThemeTokens.length);
  });

  it("omits blank values from CSS variables", () => {
    const variables = themeToCssVariables({
      "--numu-web-color-primary": " #166534 ",
      "--numu-web-color-background": "  ",
    });
    expect(variables).toEqual({ "--numu-web-color-primary": "#166534" });
  });
});
