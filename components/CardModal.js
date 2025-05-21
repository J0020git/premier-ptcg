import {
  Modal,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Pressable,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { useContext, useState, useEffect, useRef } from "react";
import { Image } from "expo-image";

import { CardContext } from "@context";
import colours from "@colours";
import globalStyles from "@globalStyles";

export default function CardModal({ visible, close }) {
  const { cards, selectedIndex, setSelectedIndex } = useContext(CardContext);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const flatListRef = useRef(null);
  const didOpenRef = useRef(false);
  const screenWidth = useWindowDimensions().width;
  const cardAspectRatio = 245 / 342;

  // Scroll FlatList to selectedIndex when modal opens
  useEffect(() => {
    if (
      visible &&
      flatListRef.current &&
      selectedIndex != null &&
      !didOpenRef.current
    ) {
      didOpenRef.current = true;

      requestAnimationFrame(() => {
        flatListRef.current?.scrollToIndex({
          index: selectedIndex,
          animated: false,
        });
      });
    } else if (!visible) {
      didOpenRef.current = false; // Reset for next open
    }
  }, [visible]);

  // Update selectedCard when selectedIndex changes
  useEffect(() => {
    const valid =
      cards &&
      cards.data &&
      cards.count > 0 &&
      selectedIndex >= 0 &&
      selectedIndex < cards.count;

    setSelectedCard(valid ? cards.data[selectedIndex] : null);
  }, [cards, selectedIndex]);

  // Scroll FlatList when selectedIndex changes
  useEffect(() => {
    if (visible && flatListRef.current && selectedIndex != null) {
      flatListRef.current?.scrollToIndex({
        index: selectedIndex,
        animated: true,
      });
    }
  }, [selectedIndex]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            style={{ flexGrow: 0 }}
            ref={flatListRef}
            data={cards.data}
            keyExtractor={(item) => item.id}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            windowSize={3}
            initialNumToRender={3}
            getItemLayout={(data, index) => ({
              length: screenWidth,
              offset: screenWidth * index,
              index,
            })}
            onMomentumScrollEnd={(event) => {
              // Scroll FlatList to new selected index on image swipe
              const index = Math.round(
                event.nativeEvent.contentOffset.x / screenWidth
              );
              if (index !== selectedIndex) {
                setSelectedIndex(index);
              }
              setIsScrolling(false);
            }}
            renderItem={({ item }) => (
              <View
                style={{
                  width: screenWidth,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.images.large }}
                  style={{
                    aspectRatio: cardAspectRatio,
                    height: (screenWidth - 48) / cardAspectRatio,
                  }}
                />
              </View>
            )}
          />

          <View style={styles.carouselControls}>
            <Pressable
              style={styles.carouselButton}
              onPress={() => {
                setIsScrolling(true);
                setSelectedIndex((prevIndex) => prevIndex - 1);
              }}
              disabled={isScrolling || selectedIndex === 0}
            >
              <Text>Prev</Text>
            </Pressable>
            <Pressable
              style={styles.carouselButton}
              onPress={close}
              disabled={isScrolling}
            >
              <Text>Close</Text>
            </Pressable>
            <Pressable
              style={styles.carouselButton}
              onPress={() => {
                setIsScrolling(true);
                setSelectedIndex((prevIndex) => prevIndex + 1);
              }}
              disabled={isScrolling || selectedIndex === cards.count - 1}
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
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    gap: 12,
  },
  carouselControls: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 24,
  },
  carouselButton: {
    flex: 1,
    padding: 12,
    backgroundColor: "pink",
    borderRadius: 12,
    alignItems: "center",
  },
});
