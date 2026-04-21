"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Heading,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Surface,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@vortx/ui";
import { useTheme } from "@vortx/ui";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { SystemBlocksShowcase } from "./_components/system-blocks";

const tokenSwatches = [
  { name: "background", label: "Background", cls: "bg-background border" },
  { name: "card", label: "Card", cls: "bg-card border" },
  { name: "muted", label: "Muted", cls: "bg-muted" },
  { name: "primary", label: "Primary", cls: "bg-primary" },
  { name: "secondary", label: "Secondary", cls: "bg-secondary" },
  { name: "accent", label: "Accent", cls: "bg-accent" },
  { name: "destructive", label: "Destructive", cls: "bg-destructive" },
  { name: "sidebar", label: "Sidebar", cls: "bg-sidebar border" },
  { name: "border", label: "Border", cls: "bg-border" },
  { name: "ring", label: "Ring", cls: "bg-ring" },
] as const;

function Section({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {desc && <p className="mt-0.5 text-sm text-muted-foreground">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

export default function DocsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background/80 px-6 backdrop-blur-sm">
          <span className="text-sm font-semibold">VX Design System</span>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {isDark ? <IconSun size={16} /> : <IconMoon size={16} />}
          </Button>
        </header>

        <main className="mx-auto max-w-5xl flex flex-col gap-16 px-6 py-12">
          {/* Intro */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">VX System</p>
            <Heading level={1}>Token-driven components for Next.js</Heading>
            <Text muted className="max-w-2xl">
              Reusable, accessible, token-based component system built on shadcn/ui, Base UI
              primitives, Tailwind CSS v4, and Tabler Icons. Optimized for Next.js App Router.
            </Text>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Tailwind v4</Badge>
              <Badge variant="secondary">shadcn/ui</Badge>
              <Badge variant="secondary">Base UI</Badge>
              <Badge variant="secondary">TypeScript strict</Badge>
              <Badge variant="secondary">OKLch tokens</Badge>
            </div>
          </div>

          {/* Token Swatches */}
          <Section title="Semantic Tokens" desc="The semantic color layer — background, card, primary, sidebar.">
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
              {tokenSwatches.map((s) => (
                <div key={s.name} className="flex flex-col items-center gap-1.5">
                  <div className={`h-10 w-full rounded-lg ${s.cls}`} />
                  <span className="text-center text-[10px] leading-none text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* Buttons */}
          <Section title="Button" desc="6 variants, 8 sizes including icon variants.">
            <Card>
              <CardContent className="flex flex-col gap-4 pt-6">
                <div className="flex flex-wrap gap-2">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="xs">XSmall</Button>
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">+</Button>
                </div>
                <div className="flex gap-2">
                  <Button disabled>Disabled</Button>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Badges */}
          <Section title="Badge" desc="Default, secondary, destructive, and outline variants.">
            <Card>
              <CardContent className="flex flex-wrap gap-2 pt-6">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </CardContent>
            </Card>
          </Section>

          {/* Composed Blocks */}
          <Section
            title="Composed Blocks"
            desc="Examples and higher-level product patterns live in the docs app, not in the shared package API."
          >
            <SystemBlocksShowcase />
          </Section>

          {/* Form Controls */}
          <Section title="Form Controls" desc="Input, Textarea, Select, Checkbox, Switch.">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Inputs</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Jane Smith" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself…" />
                    <p className="text-xs text-muted-foreground">Max 200 characters.</p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role…" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="designer">Designer</SelectItem>
                        <SelectItem value="engineer">Engineer</SelectItem>
                        <SelectItem value="pm">Product Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Toggles</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium">Checkboxes</p>
                    <div className="flex items-center gap-2">
                      <Checkbox id="opt1" />
                      <Label htmlFor="opt1">Enable notifications</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="opt2" defaultChecked />
                      <Label htmlFor="opt2">Subscribe to newsletter</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="opt3" disabled />
                      <Label htmlFor="opt3" className="opacity-50">Disabled option</Label>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium">Switches</p>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sw1">Dark mode</Label>
                      <Switch id="sw1" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sw2">Notifications</Label>
                      <Switch id="sw2" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="sw3" className="opacity-50">Disabled</Label>
                      <Switch id="sw3" disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Overlays */}
          <Section title="Overlays &amp; Disclosure" desc="Popover, Dropdown Menu, Tooltip.">
            <Card>
              <CardContent className="flex flex-wrap gap-3 pt-6">
                <Popover>
                  <PopoverTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
                    Open Popover
                  </PopoverTrigger>
                  <PopoverContent>
                    <p className="text-sm">Token-driven popover content.</p>
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
                    Actions
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Tooltip>
                  <TooltipTrigger className="inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-xs transition-colors hover:bg-secondary/80">
                    Hover me
                  </TooltipTrigger>
                  <TooltipContent>Accessible tooltip using semantic tokens.</TooltipContent>
                </Tooltip>
              </CardContent>
            </Card>
          </Section>

          {/* Tabs */}
          <Section title="Tabs" desc="Horizontal and line variants with composable API.">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Tabs use semantic tokens for all states — active, hover, and default — with no hardcoded values.
                </p>
              </TabsContent>
              <TabsContent value="tokens" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Semantic tokens drive every surface: <code>bg-muted</code>, <code>bg-background</code>, <code>text-foreground</code>.
                </p>
              </TabsContent>
              <TabsContent value="api" className="mt-4">
                <p className="text-sm text-muted-foreground">
                  Use <code>TabsList</code>, <code>TabsTrigger</code>, and <code>TabsContent</code> composable primitives.
                </p>
              </TabsContent>
            </Tabs>

            <Tabs defaultValue="one" className="mt-4">
              <TabsList variant="line">
                <TabsTrigger value="one">Line variant</TabsTrigger>
                <TabsTrigger value="two">Two</TabsTrigger>
                <TabsTrigger value="three">Three</TabsTrigger>
              </TabsList>
              <TabsContent value="one" className="mt-4">
                <p className="text-sm text-muted-foreground">Line variant uses bottom border indicator instead of pill background.</p>
              </TabsContent>
              <TabsContent value="two" className="mt-4">
                <p className="text-sm text-muted-foreground">Content for tab two.</p>
              </TabsContent>
              <TabsContent value="three" className="mt-4">
                <p className="text-sm text-muted-foreground">Content for tab three.</p>
              </TabsContent>
            </Tabs>
          </Section>

          {/* Cards & Surfaces */}
          <Section title="Cards &amp; Surfaces" desc="Card and Surface primitives.">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Card default</CardTitle>
                  <CardDescription>Rounded, bordered, token background.</CardDescription>
                </CardHeader>
              </Card>
              <Surface>
                <Text size="sm" className="font-medium">Surface primitive</Text>
                <Text size="sm" muted>Shares card tokens — use for non-semantic wrappers.</Text>
              </Surface>
              <Surface elevated>
                <Text size="sm" className="font-medium">Elevated surface</Text>
                <Text size="sm" muted>Adds shadow for depth.</Text>
              </Surface>
            </div>
          </Section>

          {/* Typography */}
          <Section title="Typography" desc="Heading and Text primitives.">
            <Card>
              <CardContent className="flex flex-col gap-3 pt-6">
                <Heading level={1}>Heading 1 — 4xl bold</Heading>
                <Heading level={2}>Heading 2 — 3xl semibold</Heading>
                <Heading level={3}>Heading 3 — 2xl semibold</Heading>
                <Heading level={4}>Heading 4 — xl semibold</Heading>
                <Text>Body text — base size, default foreground color.</Text>
                <Text size="sm" muted>Small muted — used for descriptions and secondary info.</Text>
                <Text size="xs" muted>Extra small — labels, captions, metadata.</Text>
              </CardContent>
            </Card>
          </Section>
        </main>
      </div>
    </TooltipProvider>
  );
}
