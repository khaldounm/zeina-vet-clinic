"use client";

import { createTheme, type Theme } from "@mui/material/styles";
import { palette } from "@/constants/palette";

export { palette };

// Professional sans stack. Headings and body share the same family; weight and
// size carry the hierarchy rather than a stylish display serif.
const SANS =
  'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// The mode-specific neutrals. Dark is a designed inversion: ink becomes the
// background, cream becomes text/primary, caramel stays the accent.
interface ModeTokens {
  bg: string;
  paper: string;
  textPrimary: string;
  textSecondary: string;
  primaryMain: string;
  primaryHover: string;
  primaryContrast: string;
  secondaryMain: string;
  secondaryContrast: string;
  rule: string;
  selectionBg: string;
  selectionColor: string;
}

const lightTokens: ModeTokens = {
  bg: palette.cream,
  paper: palette.paper,
  textPrimary: palette.ink,
  textSecondary: palette.inkSoft,
  primaryMain: palette.ink,
  primaryHover: palette.inkSoft,
  primaryContrast: palette.cream,
  secondaryMain: palette.caramel,
  secondaryContrast: palette.cream,
  rule: palette.rule,
  selectionBg: palette.ink,
  selectionColor: palette.cream,
};

const darkTokens: ModeTokens = {
  bg: palette.ink,
  paper: "#241F1A",
  textPrimary: palette.cream,
  textSecondary: "#B8B0A4",
  primaryMain: palette.cream,
  primaryHover: "#E5DFD3",
  primaryContrast: palette.ink,
  secondaryMain: "#C79461",
  secondaryContrast: palette.ink,
  rule: "#3A332C",
  selectionBg: palette.cream,
  selectionColor: palette.ink,
};

function makeTheme(mode: "light" | "dark", t: ModeTokens): Theme {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: t.primaryMain,
        contrastText: t.primaryContrast,
      },
      secondary: {
        main: t.secondaryMain,
        contrastText: t.secondaryContrast,
      },
      background: {
        default: t.bg,
        paper: t.paper,
      },
      text: {
        primary: t.textPrimary,
        secondary: t.textSecondary,
      },
      divider: t.rule,
    },
    typography: {
      fontFamily: SANS,
      h1: {
        fontSize: "2.25rem",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
      },
      h2: {
        fontSize: "1.875rem",
        fontWeight: 700,
        letterSpacing: "-0.015em",
        lineHeight: 1.2,
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        lineHeight: 1.25,
      },
      h4: {
        fontSize: "1.25rem",
        fontWeight: 600,
        letterSpacing: "-0.005em",
        lineHeight: 1.3,
      },
      h5: { fontSize: "1.125rem", fontWeight: 600, lineHeight: 1.35 },
      h6: { fontSize: "1rem", fontWeight: 600, lineHeight: 1.4 },
      body1: { fontSize: 16, lineHeight: 1.6 },
      body2: { fontSize: 14, lineHeight: 1.55 },
      overline: {
        fontSize: 11,
        letterSpacing: "0.08em",
        fontWeight: 600,
        lineHeight: 1.4,
      },
      button: {
        textTransform: "none",
        fontSize: 14,
        letterSpacing: 0,
        fontWeight: 600,
      },
    },
    shape: { borderRadius: 4 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: t.bg,
            color: t.textPrimary,
            fontFeatureSettings: '"kern"',
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased",
          },
          "::selection": {
            backgroundColor: t.selectionBg,
            color: t.selectionColor,
          },
          // Plain anchors (e.g. next/link) inherit the text color instead of
          // the browser's default link purple: ink in light, cream in dark.
          "a, a:visited": {
            color: "inherit",
            textDecorationColor: "currentColor",
            textUnderlineOffset: "0.15em",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 4,
            paddingInline: 20,
            paddingBlock: 8,
            minHeight: 40,
          },
        },
        variants: [
          {
            props: { variant: "contained", color: "primary" },
            style: {
              backgroundColor: t.primaryMain,
              color: t.primaryContrast,
              "&:hover": { backgroundColor: t.primaryHover },
            },
          },
          {
            props: { variant: "outlined", color: "primary" },
            style: {
              borderColor: t.primaryMain,
              color: t.primaryMain,
              borderWidth: 1,
              "&:hover": {
                backgroundColor: t.primaryMain,
                color: t.primaryContrast,
                borderColor: t.primaryMain,
              },
            },
          },
          {
            props: { variant: "text", color: "primary" },
            style: { color: t.primaryMain, paddingInline: 8 },
          },
        ],
      },
      MuiAppBar: {
        defaultProps: { color: "transparent", elevation: 0 },
      },
      MuiCard: {
        styleOverrides: {
          root: { borderRadius: 4, border: `1px solid ${t.rule}` },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: t.rule } },
      },
    },
  });
}

export const lightTheme = makeTheme("light", lightTokens);
export const darkTheme = makeTheme("dark", darkTokens);
