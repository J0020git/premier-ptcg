import {
  Modal,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
} from "react-native";
import { useContext, useState, useEffect } from "react";

import { CardContext } from "@context";
import colours from "@colours";
import globalStyles from "@globalStyles";

export default function CardModal({ visible, close }) {
  const { cards, selectedIndex } = useContext(CardContext);
  const [selectedCard, setSelectedCard] = useState(null);

  // Check if cards is populated and selectedIndex is valid
  useEffect(() => {
    const valid =
      cards &&
      cards.data &&
      cards.count > 0 &&
      selectedIndex >= 0 &&
      selectedIndex < cards.count;

    setSelectedCard(valid ? cards.data[selectedIndex] : null);
  }, [cards, selectedIndex]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          {!!selectedCard && (
            <>
              <Image
                source={{ uri: selectedCard.images.large }}
                style={{
                  aspectRatio: 245 / 342,
                  width: "100%",
                }}
              />
              <Text>{selectedCard?.name}</Text>
            </>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
