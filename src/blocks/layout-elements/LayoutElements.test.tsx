import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LayoutBrand, LayoutHeading, LayoutIconLink, LayoutImage, LayoutNavigation } from "./LayoutElements";

describe("layout elements", () => {
  it("renders a linked brand", () => {
    render(<LayoutBrand href="/" name="NUMU" tagline="ERP" variant="inline" />);
    expect(screen.getByRole("link", { name: /NUMU/ })).toHaveAttribute("href", "/");
  });

  it("renders consumer-resolved navigation items", () => {
    render(<LayoutNavigation label="Main" menuId="primary" orientation="horizontal" items={[{ key: "home", label: "Home", href: "/" }]} />);
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("renders text, image, and icon actions", () => {
    render(<>
      <LayoutHeading alignment="start" level="h2" text="Explore" />
      <LayoutImage image={{ src: "/brand.png", alt: "Brand" }} maxWidth={160} />
      <LayoutIconLink action={{ href: "/contact", label: "Contact" }} icon="mail" showLabel variant="soft" />
    </>);
    expect(screen.getByRole("heading", { level: 2, name: "Explore" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Brand" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
  });
});
