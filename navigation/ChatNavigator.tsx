// import React, { useState, useCallback, useEffect } from "react";
// import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
// import { HeaderCard } from "../components/HeaderCard";
// import { StyleSheet } from "react-native";
// import { Bubble, GiftedChat } from "react-native-gifted-chat";
// import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

// const ChatStack = createStackNavigator();

// export const ChatNavigator = () => {
//   return (
//     <ChatStack.Navigator
//       initialRouteName="ChatScreen"
//       screenOptions={{
//         ...TransitionPresets.ModalPresentationIOS,
//         headerShown: true,
//       }}
//     >
//       <ChatStack.Screen
//         options={{
//           header: () => {
//             return <HeaderCard />;
//           },
//         }}
//         name="ChatScreen"
//         component={ChatScreen}
//       />
//     </ChatStack.Navigator>
//   );
// };
