import "@/global.css";

import Octicons from "@expo/vector-icons/Octicons";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { router, Stack } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { useSession } from "@/components/SessionProvider";
import { Text } from "@/components/Text";
import { db } from "@/db";
import { calendars_ } from "@/db/schema";

export default function Page() {
  const { data: session } = useSession();
  const { data } = useLiveQuery(db.select().from(calendars_));

  return (
    <SafeAreaProvider>
      <Stack.Screen
        name="(root)/index"
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 bg-surface">
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center justify-center">
            {data.map((v) => (
              <View>
                <Text key={v.id} className="font-notosansjp-bold">
                  {v.title}
                </Text>
                <Text
                  key={v.id}
                  className="font-notosansjp-regular text-on-secondary"
                >
                  {v.title}
                </Text>
              </View>
            ))}
          </View>

          <TouchableOpacity
            className="absolute bottom-[24px] right-[24px] flex items-center justify-center rounded-full bg-primary"
            onPress={() => {
              if (session === "loading" || session === "nologin") {
                return router.push("/sign-in");
              }
              router.push("/create-calendar");
            }}
          >
            <View className="size-[48px] items-center justify-center">
              <Text className="text-on-primary">
                <Octicons name="plus" size={24} color="currentColor" />
              </Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
}
