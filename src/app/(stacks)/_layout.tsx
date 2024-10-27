import { Stack } from "expo-router";

export default function TabLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="update"
        options={{
          title: "Update",
        }}
      />
    </Stack>
  );
}
