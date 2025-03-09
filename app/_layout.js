import { Tabs } from "expo-router";

import styles from "@globalStyles";
import colours from "@colours";

import CollectionsFilled from "assets/svg/collections-filled.svg";
import CollectionsOutline from "assets/svg/collections-outline.svg";
import ExpansionsFilled from "assets/svg/expansions-filled.svg";
import ExpansionsOutline from "assets/svg/expansions-outline.svg";
import Search from "assets/svg/search.svg";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: styles.textNav,
        tabBarInactiveTintColor: colours.grey,
        tabBarActiveTintColor: colours.premier,
        tabBarStyle: {
          backgroundColor: colours.light,
          borderTopColor: colours.premier,
          borderTopWidth: 2,
          paddingTop: 6,
          height: 84,
        },
        headerTitleAlign: "left",
        headerTitleStyle: [
          styles.textHeading,
          { color: colours.premier, paddingLeft: 12, paddingRight: 12 },
        ],
        headerStyle: {
          shadowColor: "transparent",
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="expansions"
        options={{
          title: "Expansions",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <ExpansionsFilled width={30} height={30} color={color} />
            ) : (
              <ExpansionsOutline width={30} height={30} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: "Collections",
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <CollectionsFilled width={30} height={30} color={color} />
            ) : (
              <CollectionsOutline width={30} height={30} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <Search width={30} height={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
