"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
  Separator,
  SidebarTrigger,
  Button,
} from "@vortx/ui";
import { useTheme } from "@vortx/ui";
import { IconBell, IconMoon, IconSun } from "@tabler/icons-react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/components": "Components",
  "/tokens": "Tokens",
  "/primitives": "Primitives",
  "/motion": "Motion",
  "/settings": "Settings",
  "/help": "Help Center",
};

export function AppHeader() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const segments = pathname === "/" ? [] : pathname.split("/").filter(Boolean);
  const currentTitle = pageTitles[pathname] ?? segments[segments.length - 1] ?? "Dashboard";

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <Breadcrumb>
        <BreadcrumbList>
          {segments.length > 0 && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{currentTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative size-8">
          <IconBell size={16} />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-primary" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? <IconSun size={16} /> : <IconMoon size={16} />}
        </Button>
      </div>
    </header>
  );
}
