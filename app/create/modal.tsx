import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/Text";

export default function Modal() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-surface">
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center justify-center">
            <Text className="font-notosansjp-bold">
              Edit app/index.tsx to edit this screen.
            </Text>
            <Text className="text-sm">
              このスクリーンを修正するにはapp/index.tsxを編集してください。
            </Text>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
