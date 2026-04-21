/** Returns props that visually hide an element while keeping it accessible to screen readers. */
export function srOnly(): Record<string, string> {
  return {
    style:
      "position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0",
  };
}

/** Generates a stable ID from a base string for use in aria relationships. */
export function ariaId(base: string, suffix: string): string {
  return `${base}-${suffix}`;
}
