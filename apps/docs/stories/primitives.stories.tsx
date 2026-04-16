import type { Meta, StoryObj } from "@storybook/react";
import { Menu, Popover, Select, Tabs, Tooltip, Button } from "@vortx/ui";

const meta: Meta = {
  title: "Primitives/Overview",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Playground: Story = {
  render: () => (
    <div className="grid max-w-2xl gap-6 p-2">
      <div className="flex flex-wrap items-center gap-3">
        <Popover triggerLabel="Open Popover">
          <p className="text-sm">
            Popover content uses popover semantic tokens.
          </p>
        </Popover>
        <Menu
          label="Menu"
          items={[
            { id: "edit", label: "Edit" },
            { id: "archive", label: "Archive" },
            { id: "delete", label: "Delete" },
          ]}
        />
        <Tooltip content="Tooltip uses foreground/background contrast tokens.">
          <Button variant="secondary">Hover Me</Button>
        </Tooltip>
      </div>

      <Select
        aria-label="Demo select"
        options={[
          { value: "gray", label: "Gray Primary" },
          { value: "vega", label: "Gray + Vega Charts" },
        ]}
        defaultValue="gray"
      />

      <Tabs
        tabs={[
          {
            id: "tokens",
            label: "Tokens",
            content: (
              <p className="text-sm">
                Semantic CSS variables map to utility APIs via @theme inline.
              </p>
            ),
          },
          {
            id: "primitives",
            label: "Primitives",
            content: (
              <p className="text-sm">
                Behavior primitives keep style control in your design system
                layer.
              </p>
            ),
          },
        ]}
      />
    </div>
  ),
};
