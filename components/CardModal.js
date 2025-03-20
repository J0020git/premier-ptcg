import { Button, Modal, StyleSheet, SafeAreaView, Text } from "react-native";

export default function CardModal({ visible, close, cards }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={close}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Button onPress={close} title="Close"></Button>
        <Text>TODO</Text>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
