import { StyleSheet, Text, View } from "react-native";

import colours from "@colours";

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.lightgrey,
    alignItems: "center",
    justifyContent: "center",
  },
});
