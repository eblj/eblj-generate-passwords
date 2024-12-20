import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import GeneretePasswordScreen from "../generatePassword";
import Ionicons from "react-native-vector-icons/Ionicons";
import PasswordsScreen from "../passwords";
import BackupRestoreScreen from "../backup-restore";
const tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: "#004259",
        tabBarInactiveTintColor: "#004259",
      }}
    >
      <tab.Screen
        name="generatePassword"
        component={GeneretePasswordScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Início",
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return <Ionicons size={size} color={"#004259"} name="home" />;
            }
            return (
              <Ionicons size={size} color={"#004259"} name="home-outline" />
            );
          },
        }}
      ></tab.Screen>

      <tab.Screen
        name="passwords"
        component={PasswordsScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Senhas",
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <Ionicons size={size} color={"#004259"} name="lock-closed" />
              );
            }
            return (
              <Ionicons
                size={size}
                color={"#004259"}
                name="lock-closed-outline"
              />
            );
          },
        }}
      ></tab.Screen>

      <tab.Screen
        name="backup-restore"
        component={BackupRestoreScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Backup e Restore",
          tabBarIcon: ({ focused, size, color }) => {
            if (focused) {
              return (
                <Ionicons size={size} color={"#004259"} name="cloud-done" />
              );
            }
            return (
              <Ionicons
                size={size}
                color={"#004259"}
                name="cloud-done-outline"
              />
            );
          },
        }}
      ></tab.Screen>
    </tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
