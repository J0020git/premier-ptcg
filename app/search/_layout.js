import { CardProvider } from "@context";
import { Slot } from "expo-router";

export default function SearchLayout() {
  return (
    <CardProvider>
      <Slot />
    </CardProvider>
  );
}
