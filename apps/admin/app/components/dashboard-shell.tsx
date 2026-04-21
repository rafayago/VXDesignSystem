"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuGroupLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Separator,
} from "@vortx/ui";
import {
  IconBell,
  IconBox,
  IconBug,
  IconBuilding,
  IconChartBar,
  IconChevronDown,
  IconChevronRight,
  IconComponents,
  IconCreditCard,
  IconHelpCircle,
  IconLayoutDashboard,
  IconListCheck,
  IconLogout,
  IconMessageCircle,
  IconMoonStars,
  IconSearch,
  IconSelector,
  IconSettings,
  IconSettings2,
  IconShieldLock,
  IconSun,
  IconTrendingUp,
  IconUser,
  IconUsers,
  IconX,
} from "@tabler/icons-react";

// ── Navigation tree ────────────────────────────────────────────────────────────
const navGroups = [
  {
    label: "General",
    items: [
      {
        href: "/dashboard/default",
        label: "Dashboard",
        icon: IconLayoutDashboard,
        badge: undefined as string | undefined,
        sub: [
          { href: "/dashboard/default", label: "Default" },
          { href: "/dashboard/crm", label: "CRM" },
          { href: "/dashboard/finance", label: "Finance" },
          { href: "/dashboard/analytics", label: "Analytics" },
          { href: "/dashboard/components", label: "Components" },
        ],
      },
      {
        href: "/dashboard/tasks",
        label: "Tasks",
        icon: IconListCheck,
        badge: undefined,
        sub: undefined,
      },
      {
        href: "/dashboard/apps",
        label: "Apps",
        icon: IconBox,
        badge: undefined,
        sub: undefined,
      },
      {
        href: "/dashboard/chats",
        label: "Chats",
        icon: IconMessageCircle,
        badge: "3",
        sub: undefined,
      },
      {
        href: "/dashboard/users",
        label: "Users",
        icon: IconUsers,
        badge: undefined,
        sub: undefined,
      },
    ],
  },
  {
    label: "Pages",
    items: [
      {
        href: "/dashboard/errors/401",
        label: "Errors",
        icon: IconBug,
        badge: undefined,
        sub: [
          { href: "/dashboard/errors/401", label: "Unauthorized (401)" },
          { href: "/dashboard/errors/403", label: "Forbidden (403)" },
          { href: "/dashboard/errors/404", label: "Not Found (404)" },
          { href: "/dashboard/errors/500", label: "Server Error (500)" },
          { href: "/dashboard/errors/503", label: "Maintenance (503)" },
          { href: "/dashboard/coming-soon", label: "Coming Soon" },
        ],
      },
    ],
  },
  {
    label: "Other",
    items: [
      {
        href: "/dashboard/settings",
        label: "Settings",
        icon: IconSettings,
        badge: undefined,
        sub: [
          { href: "/dashboard/settings", label: "Profile" },
          { href: "/dashboard/settings/account", label: "Account" },
          { href: "/dashboard/settings/appearance", label: "Appearance" },
          { href: "/dashboard/settings/display", label: "Display" },
          {
            href: "/dashboard/settings/notifications",
            label: "Notifications",
          },
        ],
      },
      {
        href: "/dashboard/coming-soon",
        label: "Help Center",
        icon: IconHelpCircle,
        badge: undefined,
        sub: undefined,
      },
    ],
  },
];

// ── Active state helper ────────────────────────────────────────────────────────
function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard/default")
    return pathname === "/dashboard/default" || pathname === "/dashboard";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isGroupActive(
  pathname: string,
  sub: { href: string }[] | undefined,
  href: string,
): boolean {
  if (sub) return sub.some((s) => isActive(pathname, s.href));
  return isActive(pathname, href);
}

// ── Nav item ──────────────────────────────────────────────────────────────────
function NavItem({
  item,
  pathname,
}: {
  item: (typeof navGroups)[0]["items"][0];
  pathname: string;
}) {
  const Icon = item.icon;
  const groupActive = isGroupActive(pathname, item.sub, item.href);

  if (item.sub) {
    return (
      <Collapsible defaultOpen={groupActive} className="w-full">
        <CollapsibleTrigger
          className={[
            "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
            groupActive
              ? "font-medium text-foreground"
              : "text-muted-foreground",
          ].join(" ")}
        >
          <Icon className="h-4 w-4 shrink-0" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-auto h-5 px-1.5 text-xs">
              {item.badge}
            </Badge>
          )}
        </CollapsibleTrigger>
        <CollapsiblePanel>
          <div className="ml-4 mt-0.5 space-y-0.5 border-l border-border pl-3">
            {item.sub.map((s) => {
              const active = isActive(pathname, s.href);
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  className={[
                    "block rounded-md px-2.5 py-1.5 text-sm transition-colors",
                    active
                      ? "font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {s.label}
                </Link>
              );
            })}
          </div>
        </CollapsiblePanel>
      </Collapsible>
    );
  }

  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      className={[
        "flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors",
        active
          ? "bg-accent font-medium text-accent-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      ].join(" ")}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <Badge variant="secondary" className="h-5 px-1.5 text-xs">
          {item.badge}
        </Badge>
      )}
    </Link>
  );
}

// ── Shell ──────────────────────────────────────────────────────────────────────
export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* ── Sidebar ── */}
      <aside
        className={[
          "flex flex-col border-r border-border bg-card transition-all duration-300",
          sidebarOpen ? "w-60" : "w-0 overflow-hidden",
        ].join(" ")}
      >
        {/* Brand */}
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
            V
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">VX Admin</p>
            <p className="truncate text-xs text-muted-foreground">
              Design System
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setSidebarOpen(false)}
            className="shrink-0 text-muted-foreground"
          >
            <IconX className="h-4 w-4" />
          </Button>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="mb-1 px-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <NavItem key={item.href} item={item} pathname={pathname} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* User */}
        <div className="p-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <button
                  type="button"
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors hover:bg-accent"
                />
              }
            >
              <Avatar className="h-7 w-7 shrink-0">
                <AvatarFallback className="text-xs">SN</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium">satnaing</p>
                <p className="truncate text-xs text-muted-foreground">
                  satnaingdev@gmail.com
                </p>
              </div>
              <IconSelector className="h-4 w-4 shrink-0 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <div className="flex items-center gap-2 px-2 py-1.5">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>SN</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">satnaing</p>
                  <p className="truncate text-xs text-muted-foreground">
                    satnaingdev@gmail.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuGroupLabel>Account</DropdownMenuGroupLabel>
                <DropdownMenuItem>
                  <IconSettings2 className="h-4 w-4" />
                  Account Settings
                  <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconCreditCard className="h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconBell className="h-4 w-4" />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <IconLogout className="h-4 w-4" />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top header */}
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-4">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setSidebarOpen(true)}
              className="shrink-0 text-muted-foreground"
            >
              <IconLayoutDashboard className="h-4 w-4" />
            </Button>
          )}
          {!sidebarOpen && <Separator orientation="vertical" className="h-5" />}

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="h-8 pl-8 text-sm" />
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 select-none items-center gap-0.5 rounded border border-border bg-muted px-1 text-[10px] font-medium text-muted-foreground sm:flex">
              ⌘K
            </kbd>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
            >
              <IconSun className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground"
            >
              <IconSettings className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-full outline-none"
                  />
                }
              >
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-xs">SN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuGroup>
                  <DropdownMenuGroupLabel>My Account</DropdownMenuGroupLabel>
                  <DropdownMenuItem>
                    <IconUser className="h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconCreditCard className="h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconBell className="h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <IconLogout className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
