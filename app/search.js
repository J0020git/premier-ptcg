import { ActivityIndicator, StyleSheet, View, Text } from "react-native";
import { useState } from "react";

import { SearchBar, CardList } from "@components";
import colours from "@colours";

export default function SearchScreen() {
  const [textSearch, setTextSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState({});

  function constructQuery(text) {
    searchTerms = [];
    const regexp = /\“.*?\”|[^ ]+/g;
    for (const match of text.matchAll(regexp)) {
      if (match[0].startsWith("“") && match[0].endsWith("”")) {
        searchTerms.push(`"${match[0].slice(1, -1)}"`);
      } else {
        searchTerms.push(match[0]);
      }
    }

    const query = searchTerms
      .map(
        (term) =>
          `(name:${term} OR abilities.text:${term} OR attacks.text:${term})`
      )
      .join(" ");

    return query;
  }

  async function searchCards(query) {
    const baseUrl = "https://api.pokemontcg.io/v2/cards";
    const url = `${baseUrl}?q=${query}`;
    setIsLoading(true);
    const response = await fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.count != 0) setCards(json);
      })
      .catch((error) => {
        // TODO: Improve error handling
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSearch() {
    const query = constructQuery(textSearch);
    searchCards(query);
  }

  function renderContent() {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      );
    } else if (Object.keys(cards).length === 0) {
      return (
        <View style={styles.loadingContainer}>
          <Text>Todo</Text>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1, width: "100%" }}>
          <CardList cards={cards} numColumns={3} />
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      <SearchBar onChangeText={setTextSearch} onSubmitEditing={handleSearch} />
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.lightgrey,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 24,
    paddingBottom: 0,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
});
