import type { RenderResult } from "@testing-library/react";
import { axe } from "jest-axe";

export async function expectAccessible(view: RenderResult): Promise<void> {
  const results = await axe(view.container);
  expect(results.violations).toEqual([]);
}
