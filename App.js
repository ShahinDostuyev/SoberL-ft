import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { PermissionsAndroid, Platform, StyleSheet } from "react-native";
import { useEffect, useState } from "react";

import RootNavigator from "./navigation/Root";
import StartAuthStack from "./navigation/startAuthStack";

import { useSelector } from "react-redux";
import HomeNavigator from "./navigation/DriverNavigation";

export default function App() {
  const user = useSelector((state) => state.user.user);
  console.log("User info: ",user);

  return (
    <>
      <StatusBar style="light" />
      {user ? <RootNavigator /> : <StartAuthStack />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
