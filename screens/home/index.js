import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import axios from "axios";
import * as Location from "expo-location";

function HomeScreen({ navigation }) {
  const [date, setdate] = useState(new Date());
  const [show, setshow] = useState(false);
  const [ridePostponed, setridePostponed] = useState(false);
  const [driverLocations, setdriverLocations] = useState([]);
  const [location, setLocation] = useState({
    longitude: 30.636389,
    latitude: 38.320278,
  });
  const [region, setRegion] = useState(null);

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

  useEffect(() => {
    const fetchNearbyDrivers = async () => {
      try {
        // Sending POST request to the API
        const response = await axios.post(
          "https://soberlift.onrender.com/api/nearbydrivers",
          location
        );

        if (response.status === 200) {
          setdriverLocations(response.data);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchNearbyDrivers();
  }, []);

  const onChange = (event, selectedDate) => {
    setshow(false);
    const currentTime = selectedDate;
    if (moment(date).isBefore(currentTime)) {
      setdate(currentTime);
      setridePostponed(true);
      return;
    }
    setdate(new Date());
    setridePostponed(false);
  };
  const goToSearch = () => {
    navigation.navigate("DestinationSearch");
  };
  const selectTime = () => {
    console.log("Let's select time");
    setshow(true);
  };

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
      >
        {driverLocations.map((location, index) => {
          return (
            <Marker
              id={index}
              coordinate={{
                longitude: location.longitude,
                latitude: location.latitude,
              }}
              description="Location of drivers"
            >
              <Image
                id={index}
                style={{ width: 40, height: 40, resizeMode: "contain" }}
                source={require("../../assets/images/driver.png")}
              />
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.operations}>
        <Pressable onPress={goToSearch} style={styles.searchInputField}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
              marginVertical: 10,
            }}
          >
            <MaterialCommunityIcons
              name="navigation-variant"
              size={24}
              color="black"
            />
            <Text style={styles.textInput}>Where to?</Text>
          </View>
          <Pressable onPress={selectTime} style={styles.timeSelector}>
            <Ionicons name="time-sharp" size={24} color="black" />
            <Text style={{ fontSize: 20 }}>
              {ridePostponed ? moment(date).format("HH:mm") : "Now"}
            </Text>
            <AntDesign name="down" size={24} color="black" />
          </Pressable>
        </Pressable>
        <View style={styles.destinationField}>
          <View style={styles.destinationComponent}>
            <Text style={styles.titleText}>Home</Text>
            <Text>12 min</Text>
          </View>
          <View style={styles.destinationComponent}>
            <Text style={styles.titleText}>Urla Sanat sokağı</Text>
            <Text>19 min</Text>
          </View>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"time"}
            is24Hour={true}
            onChange={onChange}
          />
        )}
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  map: {
    flex: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  operations: { flex: 4, backgroundColor: "white", paddingHorizontal: 25 },
  searchInputField: {
    backgroundColor: "white",
    marginVertical: 15,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 0.5,
  },
  textInput: {
    fontSize: 24,
    marginLeft: 15,
    opacity: 0.8,
  },
  timeSelector: {
    width: "35%",
    backgroundColor: "gray",
    borderRadius: 25,
    height: "85%",
    marginRight: 3,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    opacity: 0.7,
  },
  destinationField: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  destinationComponent: {
    width: "40%",
    height: 100,
    backgroundColor: Colors.primaryYellow,
    margin: 15,
    padding: 20,
    borderRadius: 15,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
