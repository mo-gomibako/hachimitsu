import "@/global.css";

import Octicons from "@expo/vector-icons/Octicons";
import { Link } from "expo-router";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Text } from "@/components/Text";

export default function Page() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-surface">
        <SafeAreaView className="flex-1">
          <View className="items-end justify-center px-[24px] py-[8px]">
            <Link
              className="flex items-center justify-center rounded-full bg-primary"
              href="/create/modal"
            >
              <View className="size-[40px] items-center justify-center">
                <Text className="text-on-primary">
                  <Octicons name="plus" size={24} color="currentColor" />
                </Text>
              </View>
            </Link>
          </View>
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
