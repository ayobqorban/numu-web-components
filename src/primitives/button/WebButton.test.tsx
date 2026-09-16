import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WebButton } from "./WebButton";

describe("WebButton", () => {
  it("secures links that open a new browsing context", () => {
    render(
      <WebButton href="https://example.com" target="_blank">
        Visit
      </WebButton>,
    );
    expect(screen.getByRole("link", { name: "Visit" })).toHaveAttribute("rel", "noopener noreferrer");
  });
});
