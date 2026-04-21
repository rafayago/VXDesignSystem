import type { Meta, StoryObj } from "@storybook/react";
import { Box, Stack, Inline, Text, Heading, Surface } from "@vortx/ui";

const meta: Meta = {
  title: "Primitives/Layout",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const BoxPrimitive: Story = {
  name: "Box",
  render: () => (
    <Box className="rounded-lg border border-border p-4">
      Box — a plain div wrapper that accepts className.
    </Box>
  ),
};

export const StackPrimitive: Story = {
  name: "Stack",
  render: () => (
    <Stack gap={3}>
      <div className="rounded-md bg-muted px-3 py-2 text-sm">Item 1</div>
      <div className="rounded-md bg-muted px-3 py-2 text-sm">Item 2</div>
      <div className="rounded-md bg-muted px-3 py-2 text-sm">Item 3</div>
    </Stack>
  ),
};

export const InlinePrimitive: Story = {
  name: "Inline",
  render: () => (
    <Inline gap={2}>
      <div className="rounded-md bg-muted px-3 py-2 text-sm">Alpha</div>
      <div className="rounded-md bg-muted px-3 py-2 text-sm">Beta</div>
      <div className="rounded-md bg-muted px-3 py-2 text-sm">Gamma</div>
    </Inline>
  ),
};

export const TextPrimitive: Story = {
  name: "Text",
  render: () => (
    <Stack gap={2}>
      <Text size="lg">Large text</Text>
      <Text>Base text</Text>
      <Text size="sm">Small text</Text>
      <Text size="xs" muted>Extra small muted</Text>
    </Stack>
  ),
};

export const HeadingPrimitive: Story = {
  name: "Heading",
  render: () => (
    <Stack gap={2}>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
    </Stack>
  ),
};

export const SurfacePrimitive: Story = {
  name: "Surface",
  render: () => (
    <Stack gap={3}>
      <Surface>
        <Text size="sm">Default surface</Text>
      </Surface>
      <Surface elevated>
        <Text size="sm">Elevated surface with shadow</Text>
      </Surface>
    </Stack>
  ),
};
