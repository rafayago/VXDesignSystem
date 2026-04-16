"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardDescription,
  CardTitle,
  Menu,
  Popover,
  Select,
  Tabs,
  Tooltip,
} from "@vortx/ui";

export default function DocsHomePage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <main
      className={
        isDark
          ? "dark min-h-screen bg-background"
          : "min-h-screen bg-background"
      }
    >
      <section className="mx-auto grid min-h-screen w-full max-w-5xl gap-6 px-6 py-16">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            VX System
          </p>
          <h1 className="text-4xl font-semibold">
            Framework-agnostic tokens + headless primitives
          </h1>
          <p className="max-w-3xl text-muted-foreground">
            This docs app validates shared tokens from @vortx/design-tokens and
            component wrappers from @vortx/ui.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button>Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost" onClick={() => setIsDark((value) => !value)}>
            Toggle {isDark ? "Light" : "Dark"}
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardTitle>Semantic Color</CardTitle>
            <CardDescription>
              Components consume bg-background and text-foreground tokens.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Gray Primary</CardTitle>
            <CardDescription>
              Neutral primary hierarchy is tuned for product UI density.
            </CardDescription>
          </Card>
          <Card>
            <CardTitle>Vega Palette</CardTitle>
            <CardDescription>
              Chart tokens remain expressive while app surfaces stay restrained.
            </CardDescription>
          </Card>
        </div>

        <Card>
          <CardTitle>Primitive Playground</CardTitle>
          <CardDescription>
            Expanded primitives are available in the shared UI package for all
            apps.
          </CardDescription>
          <div className="mt-4 grid gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <Popover triggerLabel="Open Popover">
                <p className="text-sm">Token-driven popover content.</p>
              </Popover>
              <Menu
                label="Quick Actions"
                items={[
                  { id: "edit", label: "Edit" },
                  { id: "archive", label: "Archive" },
                  { id: "delete", label: "Delete" },
                ]}
              />
              <Tooltip content="Tooltip primitive using semantic foreground/background.">
                <Button variant="secondary">Hover</Button>
              </Tooltip>
            </div>

            <Select
              aria-label="Theme mode"
              options={[
                { value: "gray", label: "Gray Primary" },
                { value: "gray-vega", label: "Gray + Vega" },
              ]}
              defaultValue="gray"
              className="max-w-xs"
            />

            <Tabs
              tabs={[
                {
                  id: "tokens",
                  label: "Tokens",
                  content: (
                    <p className="text-sm">
                      Semantic tokens power every app surface.
                    </p>
                  ),
                },
                {
                  id: "behavior",
                  label: "Behavior",
                  content: (
                    <p className="text-sm">
                      Primitives encapsulate interaction patterns.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </Card>
      </section>
    </main>
  );
}
