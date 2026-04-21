import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Separator, ThemeProvider } from "@vortx/ui"
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
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-1000">

            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 ">

            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
