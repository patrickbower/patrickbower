/**
 * Get the breakpoint set on :before of <body> by CSS.
 *
 * @return {string} Breakpoint value.
 */
export function breakpoint() {
  return window
    .getComputedStyle(document.querySelector("body"), ":before")
    .getPropertyValue("content")
    .replace(/\"/g, "");
}
