import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Button, Badge } from "@vortx/ui";

const meta: Meta = {
  title: "UI/Card",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardTitle>Semantic Card</CardTitle>
      <CardDescription>
        Card styles use semantic tokens — bg-card, text-card-foreground, border-border.
      </CardDescription>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>With Header</CardTitle>
        <CardDescription>Header component groups title and description.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Content goes here.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>With Footer</CardTitle>
        <CardDescription>Footer for actions or metadata.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Compose freely from parts.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Confirm</Button>
        <Button size="sm" variant="ghost">Cancel</Button>
        <Badge variant="outline" className="ml-auto text-green-600 dark:text-green-400 border-green-200 dark:border-green-800">Stable</Badge>
      </CardFooter>
    </Card>
  ),
};
