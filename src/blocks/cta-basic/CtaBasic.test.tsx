import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectAccessible } from "../../../tests/accessibility";
import { CtaBasic } from "./CtaBasic";
import { ctaBasicDefaults } from "./CtaBasic.definition";
import { ctaBasicSchema } from "./CtaBasic.schema";

describe("CtaBasic", () => {
  it.each(["start", "center"] as const)("renders the %s alignment", (alignment) => {
    render(<CtaBasic {...ctaBasicDefaults} alignment={alignment} />);
    expect(screen.getByRole("heading", { level: 2, name: ctaBasicDefaults.title })).toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });

  it("requires a primary action", () => {
    expect(ctaBasicSchema.safeParse(ctaBasicDefaults).success).toBe(true);
    const { primaryAction: _primaryAction, ...withoutPrimary } = ctaBasicDefaults;
    expect(ctaBasicSchema.safeParse(withoutPrimary).success).toBe(false);
  });

  it("has no detectable accessibility violations", async () => {
    const view = render(<CtaBasic {...ctaBasicDefaults} />);
    await expectAccessible(view);
  });
});
