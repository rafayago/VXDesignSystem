import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VX Design System Docs",
  description: "Token and component playground for the VX design system"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
