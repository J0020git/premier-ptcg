import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useState, useContext } from "react";

import { CardContext } from "@context";
import { SearchBar, CardList, CardModal } from "@components";
import colours from "@colours";

export default function SearchScreen() {
  const [textSearch, setTextSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const { cards, setCards } = useContext(CardContext);
  const contentWidth = useWindowDimensions().width - 24 * 2;

  function constructQuery(text) {
    let query = "";
    const regexp = /\“.*?\”|[^ ]+/g;
    for (const match of text.matchAll(regexp)) {
      const term = match[0].replace(/[^a-zA-Z0-9\s]/g, "");
      if (match[0].startsWith("“") && match[0].endsWith("”")) {
        // Handle exact phrases, denoted with "quotes"
        query = query.concat(
          `(name:"${term}" OR abilities.text:"${term}" OR attacks.text:"${term}" OR attacks.name:"${term}") `
        );
      } else {
        // Handle individual search terms
        query = query.concat(
          `(name:*${term}* OR abilities.text:*${term}* OR attacks.text:*${term}* OR attacks.name:*${term}*) `
        );
      }
    }
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
        if (json.count == 0) setCards({}); //TODO: Improve handling 0 results.
        else setCards(json);
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
    if (textSearch.trim() == "") {
      // Prevent empty searches
      return;
    }
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
          <CardList
            listWidth={contentWidth}
            open={() => {
              setVisible(true);
            }}
          />
        </View>
      );
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={{ paddingHorizontal: 24 }}>
          <SearchBar
            onChangeText={setTextSearch}
            onSubmitEditing={handleSearch}
          />
        </View>
        {renderContent()}
        <CardModal visible={visible} close={() => setVisible(false)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.lightgrey,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 24,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
});
