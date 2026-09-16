export const numuThemeTokens = [
  "--numu-web-color-primary",
  "--numu-web-color-primary-foreground",
  "--numu-web-color-secondary",
  "--numu-web-color-secondary-foreground",
  "--numu-web-color-accent",
  "--numu-web-color-accent-foreground",
  "--numu-web-color-background",
  "--numu-web-color-foreground",
  "--numu-web-color-surface",
  "--numu-web-color-surface-foreground",
  "--numu-web-color-muted",
  "--numu-web-color-muted-foreground",
  "--numu-web-color-border",
  "--numu-web-color-ring",
  "--numu-web-color-success",
  "--numu-web-color-warning",
  "--numu-web-color-danger",
  "--numu-web-color-info",
  "--numu-web-font-sans",
  "--numu-web-font-heading",
  "--numu-web-font-size-sm",
  "--numu-web-font-size-md",
  "--numu-web-font-size-lg",
  "--numu-web-font-size-xl",
  "--numu-web-font-size-2xl",
  "--numu-web-font-size-3xl",
  "--numu-web-font-weight-normal",
  "--numu-web-font-weight-medium",
  "--numu-web-font-weight-semibold",
  "--numu-web-font-weight-bold",
  "--numu-web-line-height-tight",
  "--numu-web-line-height-normal",
  "--numu-web-line-height-relaxed",
  "--numu-web-radius-sm",
  "--numu-web-radius-md",
  "--numu-web-radius-lg",
  "--numu-web-radius-xl",
  "--numu-web-shadow-sm",
  "--numu-web-shadow-md",
  "--numu-web-shadow-lg",
  "--numu-web-container-max",
  "--numu-web-section-space-sm",
  "--numu-web-section-space-md",
  "--numu-web-section-space-lg",
] as const;

export type NumuThemeToken = (typeof numuThemeTokens)[number];
export type NumuTheme = Partial<Record<NumuThemeToken, string>>;

export function themeToCssVariables(theme: NumuTheme): Record<string, string> {
  return Object.fromEntries(
    numuThemeTokens.flatMap((token) => {
      const value = theme[token]?.trim();
      return value ? [[token, value]] : [];
    }),
  );
}
