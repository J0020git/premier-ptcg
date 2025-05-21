import { CardProvider } from "@context";
import { Slot } from "expo-router";

export default function ExpansionsLayout() {
  return (
    <CardProvider>
      <Slot />
    </CardProvider>
  );
}
