import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "src/index.ts" },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  // Externalize everything a consuming project provides
  external: [
    "react",
    "react-dom",
    "next",
    "next-themes",
    // Base UI and Tabler are re-exported — leave them external so the
    // consuming project resolves them from its own node_modules
    "@base-ui/react",
    "@tabler/icons-react",
  ],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
