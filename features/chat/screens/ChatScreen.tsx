import React, { useState, useCallback, useEffect } from "react";
import { Guid } from "js-guid";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { TextInput, Button, Text } from "react-native-paper";
import { View } from "../../../components/Themed";
import { StyleSheet } from "react-native";
import { Bubble, GiftedChat, SystemMessage } from "react-native-gifted-chat";
import ChatHeader from "../components/ChatHeader";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { decrement, increment, selectCount, incrementByAmount, decrementByAmout } from "../ChatSlice";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const mockMessages = [
  {
    _id: 2,
    text: "Hello developer",
    createdAt: new Date(),
    user: {
      _id: 3,
      name: "React Native",
    },
  },
  {
    _id: 3,
    text: "Hello world",
    createdAt: new Date(),
    user: {
      _id: 4,
      name: "React Native",
    },
  },
  {
    _id: Guid.newGuid().toString(),
    text: "Info message",
    createdAt: new Date(),
    system: true,
    systemType: "Info",
  },
];

export default function LobbyScreen({ navigation, route }: any) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [connection, setConnection] = useState<HubConnection | null>(null);
  // const [users, setUsers] = useState<any>([]);
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    // setMessages(mockMessages);
  }, []);

  const joinRoom = async (user: any, room: any) => {
    try {
      const connection = new HubConnectionBuilder().withUrl("https://localhost:44397/chat").configureLogging(LogLevel.Information).build();
      connection.on("UsersInRoom", (users) => {
        // setUsers(users);
      });

      connection.on("RecieveMessage", (message) => {
        console.log("on recieve", message);
        const m = {
          _id: message.id,
          text: message.text,
          createdAt: message.createdAt,
          user: message.user ? message.user : undefined,
          system: message.system,
          systemType: message.systemType,
        };
        // console.log("ta emot, konverterad", m);

        setMessages((messages: any) => [...messages, m]);
      });

      connection.onclose((e) => {
        setConnection(null);
        setMessages([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { user, room });
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (messages: any) => {
    console.log("on send", messages);
    try {
      const message = messages.at(-1);
      const m = {
        id: message._id,
        text: message.text,
        createdAt: message.createdAt,
        user: message.user,
        system: message.system,
        systemType: message.systemType,
      };
      if (connection) await connection.invoke("SendMessage", m);
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    try {
      if (connection) await connection.stop();
    } catch (e) {
      console.log(e);
    }
  };

  const onSend = useCallback((messages = []) => {
    console.log(messages);
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "black",
          },
          left: {
            backgroundColor: "#f5f5f5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
          left: {
            color: "black",
          },
        }}
      />
    );
  };

  const renderSystemMessage = (props: any) => {
    if (props.currentMessage.systemType === "Notification")
      return (
        <View style={styles.systemMessageNotification}>
          <Feather style={{ padding: 5 }} name="check-circle" size={24} color="white" />
          <Text style={{ padding: 5 }}>Bosse Jönsson har justerat priset till 2500 kr</Text>
          {/* <SystemMessage {...props} wrapperStyle={styles.systemMessageNotificationWrapper} textStyle={styles.systemMessageNotificationText}> */}
          {/* </SystemMessage> */}
        </View>
      );
    if (props.currentMessage.systemType === "Info")
      return (
        <View style={styles.systemMessageInfo}>
          <Ionicons style={{ padding: 5 }} name="md-information-circle-outline" size={30} color="white" />
          <Text style={{ color: "white", padding: 5 }}>Ange uppgifter som behövs för leveransen</Text>
        </View>
      );
  };

  return (
    <View style={styles.container}>
      {connection && <ChatHeader messages={messages} sendMessage={sendMessage} />}

      {!connection ? (
        <View style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}>
          <TextInput label="Name" value={name} textContentType="name" autoCapitalize="none" onChangeText={(u) => setName(u)} />
          <View style={{ margin: 6 }} />
          <TextInput label="Room" value={room} textContentType="name" autoCapitalize="none" onChangeText={(p) => setRoom(p)} />
          <Button
            mode="contained"
            color="#5cb85c"
            dark={true}
            style={{ margin: 10, borderRadius: 40 }}
            onPress={() => {
              joinRoom(name, room);
            }}
          >
            Join
          </Button>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <GiftedChat
            user={{
              _id: 4,
            }}
            messages={messages.sort((a: any, b: any) => Date.parse(b.createdAt) - Date.parse(a.createdAt))}
            onSend={(messages) => sendMessage(messages)}
            renderBubble={renderBubble}
            renderSystemMessage={renderSystemMessage}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  systemMessageNotification: {
    backgroundColor: "#f0b536",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
    margin: 5,
  },
  systemMessageInfo: {
    backgroundColor: "grey",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
    margin: 5,
  },
});
