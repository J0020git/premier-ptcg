import { View, Image, StyleSheet, Text } from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function CardList({ cards, listWidth }) {
  const numColumns = 3;
  const gap = 12;
  return (
    <FlashList
      data={cards.data}
      renderItem={({ item }) => (
        <View
          style={[
            styles.container,
            {
              width: (listWidth - gap * (numColumns - 1)) / numColumns,
              marginBottom: gap,
            },
          ]}
        >
          <Image
            source={{ uri: item.images.small }}
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={cards.count}
      numColumns={numColumns}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 245 / 342,
    overflow: "hidden",
  },
});
