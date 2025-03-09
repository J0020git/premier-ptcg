import { StyleSheet, Text, View } from "react-native";

export default function ExpansionsScreen() {
  return (
    <View style={styles.container}>
      <Text>Pokemon TCG Expansions</Text>
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
