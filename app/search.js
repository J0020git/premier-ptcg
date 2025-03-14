import { StyleSheet, View } from "react-native";
import { useState } from "react";

import { SearchBar } from "@components";
import colours from "@colours";

export default function SearchScreen() {
  const [textSearch, setTextSearch] = useState("");

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
    console.log(url);
    const response = await fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSearch() {
    const query = constructQuery(textSearch);
    searchCards(query);
  }

  return (
    <View style={styles.container}>
      <SearchBar onChangeText={setTextSearch} onSubmitEditing={handleSearch} />
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
  },
});
