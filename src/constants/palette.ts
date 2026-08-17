// Editorial cream/ink palette. These are the light-mode brand tokens; the dark
// theme derives an inverted neutral set from them (see components/ui/theme.ts).
export const palette = {
  cream: "#F4F1EA", // page background
  paper: "#FBFAF6", // card / surface background
  ink: "#1A1714", // near-black text + primary
  inkSoft: "#5C554C", // secondary text / muted ink
  caramel: "#B07D49", // accent
  rule: "#DCD6C9", // dividers / borders
} as const;

export type Palette = typeof palette;
