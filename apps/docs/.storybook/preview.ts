import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "token-bg",
      values: [
        { name: "token-bg", value: "oklch(0.98 0.002 247)" },
        { name: "token-fg", value: "oklch(0.16 0.004 260)" },
      ],
    },
  },
};

export default preview;
