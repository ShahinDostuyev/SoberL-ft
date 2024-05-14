import React, { useEffect, useState } from "react";
import PrimaryButton from "../../components/primaryButton";
import LocationHolder from "../../components/locationHolder";
import { Image, StyleSheet, Text, View } from "react-native";
import VerticalLine from "../../components/verticalLine";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";

function RideValidation({ route }) {
  const { originPlace, destinationPlace } = route.params;
  const [rideInfo, setrideInfo] = useState(null);

  const originPlaceLocation = originPlace.details.geometry.location;
  const destinationPlaceLocation = destinationPlace.details.geometry.location;

  const origin = {
    latitude: originPlaceLocation.lat,
    longitude: originPlaceLocation.lng,
  };
  const destination = {
    latitude: destinationPlaceLocation.lat,
    longitude: destinationPlaceLocation.lng,
  };
  useEffect(() => {
    const calculateDistance = () => {
      axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originPlaceLocation.lat},${originPlaceLocation.lng}&destinations=${destinationPlaceLocation.lat},${destinationPlaceLocation.lng}&key=AIzaSyCs4CFoDHas00xgk0CLFRxjLloQbbtzDM0`
        )
        .then((response) => {
          setrideInfo(response.data.rows[0].elements[0]);
        })
        .catch((error) => {
          console.error(error.message);
        });
    };
    calculateDistance();
  }, []);

  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (origin.latitude + destination.latitude) / 2,
          longitude: (origin.longitude + destination.longitude) / 2,
          latitudeDelta: Math.abs(destination.latitude - origin.latitude) * 1.5,
          longitudeDelta:
            Math.abs(destination.longitude - origin.longitude) * 1.5,
        }}
      >
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey="AIzaSyCs4CFoDHas00xgk0CLFRxjLloQbbtzDM0"
          strokeWidth={2}
        />
        <Marker
          coordinate={{
            latitude: destination.latitude,
            longitude: destination.longitude,
          }}
          title="Destination"
          description="Destination Location"
        />
        <Marker
          coordinate={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}
          title="Origin"
          description="Origin Location"
        >
          <Image
            style={{ width: 40, height: 40, resizeMode: "contain" }}
            source={require("../../assets/images/originLocation.png")}
          />
        </Marker>
      </MapView>
      <View style={styles.details}>
        <View style={styles.locationDetails}>
          <LocationHolder text={originPlace.data.description} bottomBorder />
          <LocationHolder text={destinationPlace.data.description} />
        </View>
        <View style={styles.calculatedRideDetails}>
          <View style={styles.rideInfoWrapper}>
            <Text>Distance</Text>
            <Text style={styles.rideInfoText}>{rideInfo?.distance.text}</Text>
          </View>

          <VerticalLine />

          <View style={styles.rideInfoWrapper}>
            <Text>Price</Text>
            <Text
              style={styles.rideInfoText}
            >{`${parseInt(rideInfo?.distance?.text) * 40} TL`}</Text>
          </View>

          <VerticalLine />

          <View style={styles.rideInfoWrapper}>
            <Text>Arrival</Text>
            <Text style={styles.rideInfoText}>{rideInfo?.duration?.text}</Text>
          </View>
        </View>
        <PrimaryButton color="black" textColor="white">
          Order Now
        </PrimaryButton>
      </View>
    </>
  );
}

export default RideValidation;

const styles = StyleSheet.create({
  map: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  details: {
    flex: 2,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  locationDetails: {
    width: "80%",
  },
  calculatedRideDetails: {
    width: "70%",
    marginTop: "10%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  rideInfoText: {
    marginTop: 5,
    fontWeight: "900",
  },
  rideInfoWrapper: {
    alignItems: "center",
  },
});
