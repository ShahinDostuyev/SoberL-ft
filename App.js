import { StatusBar } from "expo-status-bar";
import 'react-native-gesture-handler';
import { PermissionsAndroid, Platform, StyleSheet } from "react-native";

import { useEffect } from "react";

import RootNavigator from "./navigation/Root";

// import Geolocation from "@react-native-community/geolocation";
// navigator.geolocation = require("@react-native-community/geolocation")

export default function App() {
  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "SoberLift Location Permission",
  //         message:
  //           "SoberLift needs access to your location " +
  //           "so you can take awesome rides.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the location");
  //     } else {
  //       console.log("Location permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // useEffect(() => {
  //   if (Platform.OS === "android") {
  //     requestLocationPermission();
  //   }else{
  //     Geolocation.requestAuthorization();
  //   }
  // }, []);

  return (
    <>
      <StatusBar style="light" />
      <RootNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
