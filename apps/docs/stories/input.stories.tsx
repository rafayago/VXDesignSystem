import type { Meta, StoryObj } from "@storybook/react";
import { Input, FormField, FormLabel, FormDescription, FormError } from "@vortx/ui";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter value…",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true, value: "Disabled value" } };
export const WithError: Story = { args: { "aria-invalid": true, placeholder: "Required field" } };

export const WithLabel: Story = {
  render: () => (
    <FormField className="max-w-xs">
      <FormLabel htmlFor="email">Email</FormLabel>
      <Input id="email" type="email" placeholder="you@example.com" />
      <FormDescription>We will never share your email.</FormDescription>
    </FormField>
  ),
};

export const WithValidationError: Story = {
  render: () => (
    <FormField className="max-w-xs">
      <FormLabel htmlFor="username">Username</FormLabel>
      <Input id="username" aria-invalid placeholder="Enter username" />
      <FormError>Username is already taken.</FormError>
    </FormField>
  ),
};
