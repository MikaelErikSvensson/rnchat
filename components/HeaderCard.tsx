import * as React from "react";
import { ColorSchemeName, Pressable, View, Text } from "react-native";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

// Ta in aktuellt state. Använd redux toolkit

export function HeaderCard() {
  return (
    <View style={styles.container}>
      <View style={{ margin: 5 }} />
      <Text>Hagström sitarr</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.previousPrice}>3000 kr </Text>
        <Text style={styles.currentPrice}>2500 kr</Text>
      </View>
      <Text style={styles.finalPrice}>Insatt 2500 kr</Text>

      <View style={{ margin: 10 }} />
      <View style={{ flexDirection: "row" }}>
        <Button
          mode="contained"
          color="#5cb85c"
          dark={true}
          icon="checkbox-marked-circle-outline"
          style={{ margin: 3, borderRadius: 40 }}
          onPress={() => console.log("Godkänn")}
        >
          Godkänn
        </Button>
        <Button
          mode="contained"
          color="#d9534f"
          dark={true}
          icon="close"
          style={{ margin: 3, borderRadius: 40 }}
          onPress={() => console.log("Avbryt")}
        >
          Avbryt
        </Button>
      </View>
      <View style={{ margin: 5 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  currentPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },
  previousPrice: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  finalPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
  },
});
