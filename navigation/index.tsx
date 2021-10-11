import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../features/generic/screens/NotFoundScreen";
import SettingsScreen from "../features/settings/screens/SettingsScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";
// import { ChatNavigator } from "./ChatNavigator";
import ChatScreen from "../features/chat/screens/ChatScreen";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: "Oops!" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chat"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        // header: () => {
        //   return <HeaderCard />;
        // },
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="Chat"
        component={ChatScreen}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="chatbox-ellipses-outline" color={color} /> }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="md-settings-outline" color={color} /> }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>["name"]; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
