import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

function HomeScreen() {
  const [location, setLocation] = useState({
    longitude: 30.636389,
    latitude: 38.320278,
  });
  const [region, setRegion] = useState({
    latitude: 38.320278,
    longitude: 30.636389,
    latitudeDelta: 0.015,
    longitudeDelta: 0.04,
  });
  const [available, setavailibility] = useState(false);

  const handleAvailibility = () => {
    setavailibility(!available);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.04,
      });
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker coordinate={location} />
      </MapView>
      <View style={styles.bottomContainer}>
        <Pressable
          style={[
            styles.goButton,
            { backgroundColor: available ? "red" : "blue" },
          ]}
          onPress={handleAvailibility}
        >
          <Text style={styles.goText}>{available ? "END" : "GO"}</Text>
        </Pressable>

        <Pressable>
          <MaterialIcons name="account-circle" size={28} color="black" />
        </Pressable>
        <Text
          style={[styles.bottomText, { color: available ? "blue" : "red" }]}
        >{`You are ${available ? "Online" : "Offline"}`}</Text>
        <Pressable>
          <Entypo name="address" size={28} color="black" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  bottomContainer: {
    flex: 1.5,
    backgroundColor: "white",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomText: {
    fontSize: 26,
  },
  goButton: {
    height: 70,
    width: "25%",
    borderRadius: 50,
    position: "absolute",
    top: -80,
    right: Dimensions.get("window").width * 0.375,
    justifyContent: "center",
    alignItems: "center",
  },
  goText: {
    fontSize: 26,
    color: "white",
  },
});
