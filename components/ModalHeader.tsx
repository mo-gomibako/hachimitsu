import { FC, ReactNode } from "react";
import { View } from "react-native";

import { Text } from "./Text";

export const ModalHeader: FC<{
  left?: ReactNode;
  title: string;
  right?: ReactNode;
}> = ({ left, title, right }) => (
  <View className="h-[64px] flex-row items-center px-[16px]">
    <View className="absolute inset-x-0">
      <Text className="flex-1 font-notosansjp-bold text-xl text-on-surface-strong">
        {title}
      </Text>
    </View>
    <View className="flex-1 items-start">{left}</View>
    <View className="flex-1 items-end">{right}</View>
  </View>
);
