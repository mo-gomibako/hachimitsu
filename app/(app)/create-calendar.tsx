import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { ModalHeader } from "@/components/ModalHeader";
import { Text } from "@/components/Text";

export default function Page() {
  const [title, setTitle] = useState("");

  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-surface">
        <SafeAreaView className="flex-1">
          <ModalHeader
            left={
              <Text
                className="font-notosansjp-regular text-xl text-danger"
                onPress={() => router.dismiss()}
              >
                キャンセル
              </Text>
            }
            title="新規"
            right={
              <Text
                className="font-notosansjp-bold text-xl text-danger"
                onPress={() => router.dismiss()}
              >
                作成
              </Text>
            }
          />
          <View className="flex-1 px-[16px]">
            <TextInput
              placeholder="タイトル"
              className="h-[40px] w-full rounded-2xl border border-outline bg-surface-alt px-[12px] font-notosansjp-regular text-lg text-on-surface"
              onChangeText={setTitle}
              value={title}
              autoFocus
            />
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
