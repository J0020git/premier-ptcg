import {
  Button,
  Modal,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { useContext, useState, useEffect } from "react";

import { CardContext } from "@context";

export default function CardModal({ visible, close }) {
  const { cards, selectedIndex } = useContext(CardContext);
  const [selectedCard, setSelectedCard] = useState(null);

  // Check if cards is populated and selectedIndex is valid
  useEffect(() => {
    const valid =
      cards &&
      cards.data &&
      cards.count &&
      selectedIndex >= 0 &&
      selectedIndex < cards.count;

    setSelectedCard(valid ? cards.data[selectedIndex] : null);
  }, [cards, selectedIndex]);

  return (
    <Modal
      visible={visible && !!selectedCard}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <SafeAreaView style={styles.container}>
        <Button onPress={close} title="Close" />
        <Text>{selectedCard?.name}</Text>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
