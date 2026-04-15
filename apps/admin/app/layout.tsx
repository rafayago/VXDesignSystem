import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VX Admin App",
  description: "Admin consumer for the shared design system"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
