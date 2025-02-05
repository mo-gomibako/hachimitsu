import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(root)",
};

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(root)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="create-calendar"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
