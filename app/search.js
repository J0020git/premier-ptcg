import { StyleSheet, Text, View } from "react-native";

import { SearchBar } from "@components";
import colours from "@colours";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.lightgrey,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 24,
  },
});
