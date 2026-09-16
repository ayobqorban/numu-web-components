import "@ayobqorban/numu-web-components/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "NUMU package consumer verification",
  description: "A Next.js consumer for the private @ayobqorban/numu-web-components package.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
