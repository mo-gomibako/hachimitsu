import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";
import { Fragment, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

import { ModalHeader } from "@/components/ModalHeader";
import { useSession } from "@/components/SessionProvider";
import { Text } from "@/components/Text";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const { signIn } = useSession();
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-surface">
        <SafeAreaView className="flex-1">
          <ModalHeader
            title="アカウント"
            right={
              <Text
                className="font-notosansjp-bold text-xl text-danger"
                onPress={() => router.dismiss()}
              >
                完了
              </Text>
            }
          />
          <View className="flex-1 justify-center px-[16px]">
            <TouchableOpacity
              className={twMerge(
                "whitespace-nowrap rounded-full border border-primary bg-primary px-4 py-3 font-medium tracking-wide transition",
              )}
              onPress={async () => {
                setLoading(true);
                await signIn();
                setLoading(false);
              }}
            >
              <View className="flex-row justify-center gap-[8px]">
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Fragment>
                    <Octicons name="device-mobile" size={24} />
                    <Text className="font-notosansjp-bold text-2xl text-on-primary">
                      開発環境でサインイン
                    </Text>
                  </Fragment>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
