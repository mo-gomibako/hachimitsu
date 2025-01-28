import { ComponentProps } from "react";
// eslint-disable-next-line no-restricted-imports
import { Text as RnText } from "react-native";
import { twMerge } from "tailwind-merge";

export const Text = ({
  className,
  ...props
}: ComponentProps<typeof RnText>) => (
  <RnText
    {...props}
    className={twMerge(
      "font-notosansjp-regular text-xl text-center text-on-surface",
      className,
    )}
  />
);
