import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@vortx/ui";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Badge",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Stable: Story = {
  args: { variant: "outline", children: "Stable" },
  render: (args) => (
    <Badge {...args} className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-800" />
  ),
};
