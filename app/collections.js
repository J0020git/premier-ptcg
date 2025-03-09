import { StyleSheet, Text, View } from "react-native";

export default function CollectionsScreen() {
  return (
    <View style={styles.container}>
      <Text>My Collections</Text>
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
