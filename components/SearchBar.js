import { StyleSheet, Text, View } from "react-native";

import Search from "assets/svg/search.svg";
import colours from "@colours";
import globalStyles from "@globalStyles";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Search width={16} height={16} color={colours.grey} />
      <Text
        style={[globalStyles.textLarge, styles.textSearch]}
        numberOfLines={1}
      >
        Search by card name or card text
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    backgroundColor: colours.light,
    overflow: "hidden",
    width: "100%",
    padding: 12,
    gap: 12,
    borderRadius: 16,
  },
  textSearch: {
    color: colours.grey,
    flex: 1,
  },
});
