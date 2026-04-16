import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VX Admin Dashboard",
  description: "Static dashboard built with VX tokens and shared UI primitives",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
