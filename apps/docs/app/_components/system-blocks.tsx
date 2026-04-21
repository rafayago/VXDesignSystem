"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Surface,
  Switch,
  Text,
} from "@vortx/ui";
import {
  IconArrowRight,
  IconRocket,
  IconSettings,
  IconSparkles,
} from "@tabler/icons-react";

export function SystemBlocksShowcase() {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-card to-muted/40">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary">Launch block</Badge>
            <IconSparkles size={16} className="text-primary" />
          </div>
          <CardTitle>Ship a new product surface faster</CardTitle>
          <CardDescription>
            Blocks stay in the docs app as examples, while the shared package stays strict and reusable.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button>
            Start building
            <IconArrowRight size={14} />
          </Button>
          <Button variant="outline">Read guidelines</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <IconSettings size={16} className="text-muted-foreground" />
            <CardTitle>Preferences block</CardTitle>
          </div>
          <CardDescription>Example settings composition built only from core design-system exports.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-1.5">
            <Label htmlFor="workspace-name">Workspace name</Label>
            <Input id="workspace-name" defaultValue="VX Design System" />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="workspace-theme">Default theme</Label>
            <Select>
              <SelectTrigger id="workspace-theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Enable release notes</p>
              <Text as="span" size="sm" muted>
                Notify product teams when new blocks or tokens land.
              </Text>
            </div>
            <Switch defaultChecked aria-label="Enable release notes" />
          </div>
        </CardContent>
      </Card>

      <Surface tone="muted" padding="lg" className="xl:col-span-2">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <IconRocket size={16} className="text-primary" />
              <p className="text-sm font-semibold">Docs-only composed blocks</p>
            </div>
            <Text size="sm" muted>
              Use the shared package for tokens, primitives, and core UI. Keep higher-level product patterns in the docs or app layer.
            </Text>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Core package</Badge>
            <Badge variant="secondary">Docs examples</Badge>
            <Badge variant="outline">Next.js first</Badge>
          </div>
        </div>
      </Surface>

      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>FAQ / guidance block</CardTitle>
          <CardDescription>Reusable disclosure pattern for onboarding and documentation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>What belongs in the shared package?</AccordionTrigger>
              <AccordionContent>
                Tokens, primitives, and reusable core UI elements with stable APIs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Where should advanced examples live?</AccordionTrigger>
              <AccordionContent>
                In the docs app, where they can evolve as reference blocks without bloating the public package surface.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
