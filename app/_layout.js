import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Index",
        }}
      />
      <Tabs.Screen
        name="expansions"
        options={{
          title: "Expansions",
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: "Collections",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
    </Tabs>
  );
}
