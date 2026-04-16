"use client";

import { useState } from "react";
import {
  AppDialog,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Progress,
  Select,
  Separator,
  Skeleton,
  Switch,
  TabsList,
  TabsPanel,
  TabsRoot,
  TabsTrigger,
  Textarea,
  Tooltip,
} from "@vortx/ui";
import {
  IconBell,
  IconDownload,
  IconMail,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
} from "@tabler/icons-react";
import { SectionHeader } from "../../components/admin-widgets";

export default function ComponentsShowcasePage() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Components"
        description="All @vortx/ui components showcased with Tabler icons and token-based styling."
      />

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            All button variants and sizes with icon support.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">
              <IconPlus className="mr-1.5 h-3.5 w-3.5" />
              Small
            </Button>
            <Button>
              <IconDownload className="mr-1.5 h-4 w-4" />
              Default
            </Button>
            <Button size="lg">
              <IconMail className="mr-2 h-4 w-4" />
              Large
            </Button>
            <Button size="icon" variant="outline">
              <IconSettings className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline">
              <IconTrash className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>
            Status and label badges across all variants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Inputs & Labels */}
      <Card>
        <CardHeader>
          <CardTitle>Inputs & Forms</CardTitle>
          <CardDescription>
            Text inputs, labels, textarea, and select controls.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="demo-name">Display name</Label>
              <Input id="demo-name" placeholder="Rafa Yago" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="demo-email">Email address</Label>
              <Input
                id="demo-email"
                type="email"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="demo-bio">Bio</Label>
            <Textarea id="demo-bio" placeholder="Tell us about yourself…" />
          </div>
          <div className="space-y-1.5">
            <Label>Priority</Label>
            <Select
              placeholder="Select priority"
              options={[
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ]}
            />
          </div>
          <div className="relative max-w-xs">
            <IconSearch className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search with icon…" className="pl-8" />
          </div>
        </CardContent>
      </Card>

      {/* Checkbox & Switch */}
      <Card>
        <CardHeader>
          <CardTitle>Checkbox & Switch</CardTitle>
          <CardDescription>
            Toggle controls using @base-ui/react primitives.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox defaultChecked /> Accept terms
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Checkbox /> Subscribe to updates
            </label>
          </div>
          <Separator />
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <Switch defaultChecked /> Email notifications
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <Switch /> SMS alerts
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Avatars</CardTitle>
          <CardDescription>User avatar with initials fallback.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            {["OM", "JL", "IN", "WK", "SD"].map((init) => (
              <Avatar key={init}>
                <AvatarFallback>{init}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress & Skeleton */}
      <Card>
        <CardHeader>
          <CardTitle>Progress & Skeleton</CardTitle>
          <CardDescription>
            Loading states and progress indicators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Upload progress</span>
              <span>68%</span>
            </div>
            <Progress value={68} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage used</span>
              <span>91%</span>
            </div>
            <Progress value={91} />
          </div>
          <Separator />
          <div className="space-y-2">
            <Skeleton className="h-5 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Tabs</CardTitle>
          <CardDescription>
            @base-ui/react/tabs powered tab panel.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TabsRoot defaultValue="one">
            <TabsList>
              <TabsTrigger value="one">Overview</TabsTrigger>
              <TabsTrigger value="two">Analytics</TabsTrigger>
              <TabsTrigger value="three">Settings</TabsTrigger>
            </TabsList>
            <TabsPanel
              value="one"
              className="mt-3 text-sm text-muted-foreground"
            >
              Overview content sample.
            </TabsPanel>
            <TabsPanel
              value="two"
              className="mt-3 text-sm text-muted-foreground"
            >
              Analytics content sample.
            </TabsPanel>
            <TabsPanel
              value="three"
              className="mt-3 text-sm text-muted-foreground"
            >
              Settings content sample.
            </TabsPanel>
          </TabsRoot>
        </CardContent>
      </Card>

      {/* Tooltip & Dialog */}
      <Card>
        <CardHeader>
          <CardTitle>Tooltip & Dialog</CardTitle>
          <CardDescription>
            Overlay primitives with token-based styles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip content="This is a tooltip from @vortx/ui">
              <Button variant="secondary">
                <IconBell className="mr-1.5 h-4 w-4" />
                Hover me
              </Button>
            </Tooltip>
            <AppDialog
              open={open}
              onOpenChange={setOpen}
              title="Dialog Primitive"
              description="This uses the AppDialog component from @vortx/ui."
              trigger={<Button variant="outline">Open dialog</Button>}
            >
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  No backend behavior, just static interaction.
                </p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setOpen(false)}>Confirm</Button>
                </div>
              </div>
            </AppDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
