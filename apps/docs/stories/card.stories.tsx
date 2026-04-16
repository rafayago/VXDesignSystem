import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardDescription, CardTitle } from "@vortx/ui";

const meta: Meta = {
  title: "Components/Card",
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card>
      <CardTitle>Semantic Card</CardTitle>
      <CardDescription>
        Card styles are pulled from design tokens and semantic utility mapping.
      </CardDescription>
    </Card>
  ),
};
