import { createContext, useState } from "react";

export const CardContext = createContext();

export function CardProvider({ children }) {
  const [cards, setCards] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const baseUrl = "https://api.pokemontcg.io/v2";

  async function searchCards(query) {
    const url = `${baseUrl}/cards?q=${query}&orderBy=-set.releaseDate`;
    const response = await fetch(url);
    const json = await response.json();
    if (json.count === 0) {
      setCards({});
    } else {
      setCards(json);
    }
    return json;
  }

  async function searchSets() {
    const url = `${baseUrl}/sets?&orderBy=-releaseDate,name`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  return (
    <CardContext.Provider
      value={{
        cards,
        setCards,
        selectedIndex,
        setSelectedIndex,
        searchCards,
        searchSets,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export default CardContext;
