import React, { useState, useCallback, useEffect } from "react";
import { Guid } from "js-guid";
import { Button, Text } from "react-native-paper";
import { View } from "../../../components/Themed";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function ChatHeader({ messages, sendMessage }: any) {
  const infoMessage = {
    _id: Guid.newGuid().toString(),
    text: "Info message",
    createdAt: new Date(),
    system: true,
    systemType: "Info",
  };
  return (
    <View style={{ backgroundColor: "#F3F3F3", padding: 20 }}>
      <Text style={{ textAlign: "center" }}>Hagström gitarr</Text>
      <Text style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>2500 kr</Text>

      <View style={{ backgroundColor: "#F3F3F3", flexDirection: "row", justifyContent: "space-evenly", margin: 15 }}>
        <Button
          color="green"
          style={{ borderRadius: 20 }}
          icon="checkbox-marked-circle-outline"
          mode="contained"
          onPress={() => {
            console.log("Godkänn");
          }}
        >
          Godkänn
        </Button>
        <Button color="red" style={{ borderRadius: 20 }} icon="close" mode="contained" onPress={() => console.log("Avbryt")}>
          Avbryt
        </Button>
      </View>
      <Button
        color="grey"
        style={{ borderRadius: 20 }}
        mode="contained"
        onPress={() => {
          sendMessage([...messages, infoMessage]);
        }}
      >
        Skicka systemmeddelande
      </Button>
    </View>
  );
}
