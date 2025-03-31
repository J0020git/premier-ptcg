import { Pressable } from "react-native";
import { Image } from "expo-image";
import { FlashList } from "@shopify/flash-list";
import { CardContext } from "@context";
import { useContext } from "react";

export default function CardList({ listWidth, open }) {
  const { cards, setSelectedIndex } = useContext(CardContext);
  const numColumns = 3;
  const gap = 12;

  function calculateAlignment(index) {
    if (index % numColumns === 0) return "flex-start";
    else if (index % numColumns === numColumns - 1) return "flex-end";
    else return "center";
  }

  return (
    <FlashList
      data={cards.data}
      renderItem={({ item, index }) => (
        <Pressable
          style={{
            width: "100%",
            marginBottom: gap,
            alignItems: calculateAlignment(index),
          }}
          onPress={() => {
            setSelectedIndex(index);
            open();
          }}
        >
          <Image
            source={{ uri: item.images.small, cache: "force-cache" }}
            placeholder={require("@assets/cardBackSmall.png")}
            style={{
              aspectRatio: 245 / 342,
              width: (listWidth - gap * (numColumns - 1)) / numColumns,
            }}
            contentFit="contain"
            placeholderContentFit="contain"
            transition={100}
          />
        </Pressable>
      )}
      keyExtractor={(item) => item.id}
      estimatedItemSize={cards.count}
      numColumns={numColumns}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={true}
      contentContainerStyle={{
        paddingTop: 12,
        paddingLeft: 24,
        paddingRight: 24,
      }}
    />
  );
}
