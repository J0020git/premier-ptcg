import { StyleSheet, TextInput, View } from "react-native";

import Search from "assets/svg/search.svg";
import colours from "@colours";
import globalStyles from "@globalStyles";

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Search width={16} height={16} color={colours.grey} />
      <TextInput
        style={[globalStyles.textLarge, styles.textSearch]}
        numberOfLines={1}
        placeholder="Search by card name or card text"
        placeholderTextColor={colours.grey}
        enterKeyHint="search"
      ></TextInput>
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
    gap: 6,
    borderRadius: 16,
  },
  textSearch: {
    color: colours.dark,
    flex: 1,
  },
});
