import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CatalogApp } from "./CatalogApp";

describe("CatalogApp", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/");
  });

  it("demonstrates Theme A in Arabic RTL by default", () => {
    const view = render(<CatalogApp />);
    const themedRoot = view.container.querySelector(".numu-web-theme");
    expect(themedRoot).toHaveClass("theme-a");
    expect(themedRoot).toHaveAttribute("dir", "rtl");
    expect(themedRoot).toHaveAttribute("lang", "ar");
    expect(view.container.querySelectorAll("[data-numu-block]")).toHaveLength(11);
  });

  it("switches to Theme B, English LTR, and mobile width", async () => {
    const user = userEvent.setup();
    const view = render(<CatalogApp />);
    await user.selectOptions(screen.getByLabelText("Theme"), "theme-b");
    await user.selectOptions(screen.getByLabelText("Direction"), "ltr");
    await user.selectOptions(screen.getByLabelText("Viewport"), "mobile");

    expect(view.container.querySelector(".numu-web-theme")).toHaveClass("theme-b");
    expect(view.container.querySelector(".numu-web-theme")).toHaveAttribute("dir", "ltr");
    expect(view.container.querySelector(".catalog-preview")).toHaveClass("mobile");
    expect(screen.getByRole("heading", { level: 1, name: /dependable foundation/i })).toBeInTheDocument();
  });

  it("supports query parameters for reproducible acceptance states", () => {
    window.history.replaceState({}, "", "/?theme=theme-b&direction=ltr&viewport=tablet");
    const view = render(<CatalogApp />);
    expect(view.container.querySelector(".numu-web-theme")).toHaveClass("theme-b");
    expect(view.container.querySelector(".numu-web-theme")).toHaveAttribute("dir", "ltr");
    expect(view.container.querySelector(".catalog-preview")).toHaveClass("tablet");
  });
});
