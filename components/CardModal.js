import {
  Modal,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { useContext, useState, useEffect } from "react";

import { CardContext } from "@context";
import colours from "@colours";
import globalStyles from "@globalStyles";

export default function CardModal({ visible, close }) {
  const { cards, selectedIndex, setSelectedIndex } = useContext(CardContext);
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
              <View style={styles.carouselControls}>
                <Pressable
                  style={styles.carouselButton}
                  onPress={() => {
                    setSelectedIndex((prevIndex) => prevIndex - 1);
                  }}
                  disabled={selectedIndex === 0}
                >
                  <Text>Prev</Text>
                </Pressable>
                <Pressable style={styles.carouselButton} onPress={close}>
                  <Text>Close</Text>
                </Pressable>
                <Pressable
                  style={styles.carouselButton}
                  onPress={() => {
                    setSelectedIndex((prevIndex) => prevIndex + 1);
                  }}
                  disabled={selectedIndex === cards.count - 1}
                >
                  <Text>Next</Text>
                </Pressable>
              </View>
              <View>
                <Text
                  style={[
                    globalStyles.textHeading,
                    { color: colours.dark, alignSelf: "center" },
                  ]}
                >
                  {selectedCard?.name}
                </Text>
                <Text
                  style={[
                    globalStyles.textSubheading,
                    { color: colours.grey, alignSelf: "center" },
                  ]}
                >
                  {selectedCard?.set?.name}
                </Text>
              </View>
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
    gap: 12,
  },
  carouselControls: {
    width: "100%",
    flexDirection: "row",
  },
  carouselButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "pink",
    borderRadius: 12,
    alignItems: "center",
  },
});
