import { Pressable, Image, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { CardContext } from "@context";
import { useContext } from "react";

export default function CardList({ listWidth, open }) {
  const { cards, setSelectedIndex } = useContext(CardContext);
  const numColumns = 3;
  const gap = 12;
  return (
    <FlashList
      data={cards.data}
      renderItem={({ item, index }) => (
        <Pressable
          style={[
            styles.container,
            {
              width: (listWidth - gap * (numColumns - 1)) / numColumns,
              marginBottom: gap,
            },
          ]}
          onPress={() => {
            setSelectedIndex(index);
            open();
          }}
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
