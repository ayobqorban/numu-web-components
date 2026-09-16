import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectAccessible } from "../../../tests/accessibility";
import { TextImage } from "./TextImage";
import { textImageDefaults } from "./TextImage.definition";
import { textImageSchema } from "./TextImage.schema";

describe("TextImage", () => {
  it.each(["start", "end"] as const)("renders an image at the logical %s", (imagePosition) => {
    render(<TextImage {...textImageDefaults} imagePosition={imagePosition} />);
    expect(screen.getByRole("heading", { level: 2, name: textImageDefaults.heading })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: textImageDefaults.image.alt })).toBeInTheDocument();
  });

  it("accepts defaults and rejects unsafe action URLs", () => {
    expect(textImageSchema.safeParse(textImageDefaults).success).toBe(true);
    expect(
      textImageSchema.safeParse({
        ...textImageDefaults,
        action: { href: "javascript:alert(1)", label: "Unsafe" },
      }).success,
    ).toBe(false);
  });

  it("has no detectable accessibility violations", async () => {
    const view = render(<TextImage {...textImageDefaults} />);
    await expectAccessible(view);
  });
});
