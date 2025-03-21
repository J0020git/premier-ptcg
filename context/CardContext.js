import { createContext, useState } from "react";

export const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
        selectedIndex,
        setSelectedIndex,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export default CardContext;
