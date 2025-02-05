import {
  NotoSansJP_400Regular,
  NotoSansJP_700Bold,
} from "@expo-google-fonts/noto-sans-jp";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import { SessionProvider } from "@/components/SessionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { db, expoDb } from "@/db";
import migrations from "@/drizzle/migrations";

SplashScreen.preventAutoHideAsync();

const useDb = () => {
  const { success: isMigrationSucceed, error: migrationError } = useMigrations(
    db,
    migrations,
  );
  useDrizzleStudio(expoDb);
  return {
    isMigrationSucceed,
    migrationError,
  };
};

export default function AppLayout() {
  const { isMigrationSucceed, migrationError } = useDb();
  const [isFontsLoaded, fontsError] = useFonts({
    NotoSansJP_400Regular,
    NotoSansJP_700Bold,
  });
  const isLoaded = isFontsLoaded && isMigrationSucceed;

  useEffect(() => {
    if (fontsError) console.error(fontsError);
    if (migrationError) console.error(migrationError);
  }, [fontsError, migrationError]);

  useEffect(() => {
    if (isLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded, isLoaded]);

  if (!isLoaded) {
    return (
      <ThemeProvider>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </ThemeProvider>
    );
  }

  return (
    <SessionProvider>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </SessionProvider>
  );
}
