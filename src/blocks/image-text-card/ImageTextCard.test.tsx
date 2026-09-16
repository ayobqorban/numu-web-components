import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectAccessible } from "../../../tests/accessibility";
import { ImageTextCard } from "./ImageTextCard";
import { imageTextCardDefaults } from "./ImageTextCard.definition";
import { imageTextCardSchema } from "./ImageTextCard.schema";

describe("ImageTextCard", () => {
  it.each(["elevated", "outlined", "flat"] as const)("renders the %s variant", (variant) => {
    render(<ImageTextCard {...imageTextCardDefaults} headingLevel={2} variant={variant} />);
    expect(screen.getByRole("heading", { level: 2, name: imageTextCardDefaults.title })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: imageTextCardDefaults.image.alt })).toHaveAttribute("loading", "lazy");
  });

  it("requires accessible media metadata", () => {
    expect(imageTextCardSchema.safeParse(imageTextCardDefaults).success).toBe(true);
    expect(
      imageTextCardSchema.safeParse({ ...imageTextCardDefaults, image: { src: "/image.jpg" } }).success,
    ).toBe(false);
  });

  it("has no detectable accessibility violations", async () => {
    const view = render(<ImageTextCard {...imageTextCardDefaults} headingLevel={2} />);
    await expectAccessible(view);
  });
});
