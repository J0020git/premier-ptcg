import { Pressable, Image, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function CardList({ cards, listWidth, onCardPress }) {
  const numColumns = 3;
  const gap = 12;
  return (
    <FlashList
      data={cards.data}
      renderItem={({ item }) => (
        <Pressable
          style={[
            styles.container,
            {
              width: (listWidth - gap * (numColumns - 1)) / numColumns,
              marginBottom: gap,
            },
          ]}
          onPress={onCardPress}
        >
          <Image
            source={{ uri: item.images.small }}
            style={{ height: "100%", width: "100%" }}
          />
        </Pressable>
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
