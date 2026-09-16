import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectAccessible } from "../../../tests/accessibility";
import { HeroBasic } from "./HeroBasic";
import { heroBasicDefaults } from "./HeroBasic.definition";
import { heroBasicSchema } from "./HeroBasic.schema";

describe("HeroBasic", () => {
  it("renders preview-safe defaults and inherits RTL direction", () => {
    const view = render(
      <div dir="rtl">
        <HeroBasic {...heroBasicDefaults} />
      </div>,
    );
    expect(screen.getByRole("heading", { level: 1, name: heroBasicDefaults.title })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: heroBasicDefaults.primaryAction.label })).toHaveAttribute(
      "href",
      "#learn-more",
    );
    expect(view.container.querySelector('[data-numu-block="hero.basic"]')).not.toHaveAttribute("dir");
  });

  it("validates defaults and rejects unknown props", () => {
    expect(heroBasicSchema.safeParse(heroBasicDefaults).success).toBe(true);
    expect(heroBasicSchema.safeParse({ ...heroBasicDefaults, companyId: 42 }).success).toBe(false);
  });

  it("has no detectable accessibility violations", async () => {
    const view = render(<HeroBasic {...heroBasicDefaults} />);
    await expectAccessible(view);
  });
});
