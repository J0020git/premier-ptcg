import { View } from "react-native";
import { FlashList } from "@shopify/flash-list";

export default function CardList({ cards, numColumns }) {
  return (
    <FlashList
      data={cards.data}
      renderItem={({ item }) => (
        <View
          style={{
            flex: 1,
            height: 10,
            margin: 1,
            backgroundColor: "blue",
          }}
        />
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={cards.count}
      numColumns={numColumns}
    />
  );
}
