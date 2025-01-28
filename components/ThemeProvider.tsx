// src/shared-components/providers/ThemeProviders.tsx
import { useColorScheme } from "nativewind";
import { vars } from "nativewind";
import React, { FC, PropsWithChildren } from "react";
import { View } from "react-native";
import colors from "tailwindcss/colors";

/** @see https://www.penguinui.com/theme#typography?config=modern_lato_lato_true_-sm_black_white_neutral-800_neutral-300_white_neutral-950_neutral-50_neutral-900_neutral-600_neutral-900_neutral-300_white_neutral-100_black_white_black_neutral-300_neutral-700_neutral-800_neutral-300_red-500_white_sky-500_white_amber-500_white_green-500_white */
export const themes = {
  light: vars({
    "--color-surface": colors.white,
    "--color-surface-alt": colors.neutral["50"],
    "--color-on-surface": colors.neutral["600"],
    "--color-on-surface-strong": colors.neutral["900"],
    "--color-primary": colors.black,
    "--color-on-primary": colors.neutral["100"],
    "--color-secondary": colors.neutral["800"],
    "--color-on-secondary": colors.white,
    "--color-outline": colors.neutral["300"],
    "--color-outline-strong": colors.neutral["800"],

    "--color-info": colors.sky["500"],
    "--color-on-info": colors.white,
    "--color-success": colors.green["500"],
    "--color-on-success": colors.white,
    "--color-warning": colors.amber["500"],
    "--color-on-warning": colors.white,
    "--color-danger": colors.red["500"],
    "--color-on-danger": colors.white,
  }),
  dark: vars({
    "--color-surface": colors.neutral["950"],
    "--color-surface-alt": colors.neutral["900"],
    "--color-on-surface": colors.neutral["300"],
    "--color-on-surface-strong": colors.white,
    "--color-primary": colors.white,
    "--color-on-primary": colors.black,
    "--color-secondary": colors.neutral["300"],
    "--color-on-secondary": colors.black,
    "--color-outline": colors.neutral["700"],
    "--color-outline-strong": colors.neutral["300"],

    "--color-info": colors.sky["500"],
    "--color-on-info": colors.white,
    "--color-success": colors.green["500"],
    "--color-on-success": colors.white,
    "--color-warning": colors.amber["500"],
    "--color-on-warning": colors.white,
    "--color-danger": colors.red["500"],
    "--color-on-danger": colors.white,
  }),
};

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const colorScheme = useColorScheme().colorScheme ?? "light";
  return (
    <View style={themes[colorScheme]} className="flex-1">
      {children}
    </View>
  );
};
