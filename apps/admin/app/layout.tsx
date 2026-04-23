import { Separator, ThemeProvider } from "@vortx/ui"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: { default: "VX Admin", template: "%s — VX Admin" },
  description: "Design system admin powered by VX",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="light">
          <header className="fixed w-full top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </header>
          <div className="flex flex-1 flex-col gap-4 z-300 pt-13">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
