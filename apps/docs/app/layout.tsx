import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@vortx/ui";

export const metadata: Metadata = {
  title: "VX Design System",
  description: "Component gallery and token playground for the VX Design System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system">{children}</ThemeProvider>
      </body>
    </html>
  );
}
