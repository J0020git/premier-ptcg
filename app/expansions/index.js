import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useContext, useEffect, useState } from "react";

import { CardContext } from "@context";
import colours from "@colours";
import globalStyles from "@globalStyles";

export default function ExpansionsScreen() {
  const { searchSets } = useContext(CardContext);
  const [groupedExpansions, setGroupedExpansions] = useState([]);
  const contentWidth = useWindowDimensions().width - 24 * 2;
  const numColumns = 2;
  const gap = 12;

  useEffect(() => {
    async function fetchData() {
      const json = await searchSets();

      const customSeriesOrder = [
        "Scarlet & Violet",
        "Sword & Shield",
        "Sun & Moon",
        "XY",
        "Black & White",
        "HeartGold & SoulSilver",
        "Platinum",
        "Diamond & Pearl",
        "EX",
        "E-Card",
        "Neo",
        "Gym",
        "Base",
        "NP",
        "POP",
        "Other",
      ];
      const grouped = customSeriesOrder.map((series) => {
        const expansions = json.data.filter(
          (expansion) => expansion.series === series
        );
        return { series, expansions };
      });
      setGroupedExpansions(grouped);
    }
    fetchData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ rowGap: gap * 4 }}
    >
      {groupedExpansions.map(({ series, expansions }) => (
        <View style={{ gap: gap }}>
          <Text key={series} style={styles.seriesTitle}>
            {series}
          </Text>
          <View style={styles.seriesGrid}>
            {expansions.map((exp) => {
              const tileWidth =
                (contentWidth - gap * (numColumns - 1)) / numColumns;
              const aspectRatio = 3 / 4;
              return (
                <View
                  key={exp.id}
                  style={{
                    width: tileWidth,
                    height: tileWidth * aspectRatio,
                    borderRadius: 16,
                    backgroundColor: colours.light,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.expansionText}>{exp.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.lightgrey,
    padding: 24,
  },
  seriesTitle: [globalStyles.textSubheading, { color: colours.dark }],
  seriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  expansionText: [globalStyles.text, { color: colours.dark }],
});
