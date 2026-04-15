import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@acme/ui";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Launch",
    variant: "primary",
    withIcon: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const WithIcon: Story = {
  args: {
    withIcon: true,
  },
};
