import React, { useEffect, useState, useRef } from "react";
import PrimaryButton from "../../components/primaryButton";
import LocationHolder from "../../components/locationHolder";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import VerticalLine from "../../components/verticalLine";
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";
import { useSelector } from "react-redux";
import Colors from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import RateClient from "../../components/rate";

function RideValidation({ route, navigation }) {
  const user = useSelector((state) => state.user.user.client);
  const { originPlace, destinationPlace } = route.params;
  const [rideInfo, setRideInfo] = useState(null);
  const [ordered, setOrdered] = useState(false);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [ride, setRide] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [pickedUp, setPickedUp] = useState(false);
  const [finished, setFinished] = useState(false);
  console.log(driverLocation);

  const intervalId = useRef(null);
  const driverLocationIntervalId = useRef(null);

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

  const newRequest = {
    clientId: user._id,
    scheduledTime: new Date(),
    pickupLocation: {
      address: originPlace.data.description,
      latitude: originPlaceLocation.lat,
      longitude: originPlaceLocation.lng,
    },
    dropOffLocation: {
      address: destinationPlace.data.description,
      latitude: destinationPlaceLocation.lat,
      longitude: destinationPlaceLocation.lng,
    },
    fare: rideInfo ? parseInt(rideInfo.distance.text) * 40 : 0,
  };

  const handleRideCancel = async (rideId) => {
    try {
      const response = await axios.put(
        `https://soberlift.onrender.com/api/cancelRide/${ride._id}`
      );
      console.log("Ride canceled");
      navigation.navigate("Home");
    } catch (e) {
      console.error("soberlift : ", e);
    }
  };

  const handlePickUp = () => {
    console.log("Arrived at the pickup location");
    setPickedUp(true);
  };

  const getRide = async (requestId) => {
    console.log("Getridde function id: ", requestId);
    await axios
      .post(`https://soberlift.onrender.com/api/getRide`, {
        requestId,
      })
      .then((response) => {
        console.log(response.data);
        setRide(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const checkRequestStatus = async (requestId) => {
    try {
      const response = await axios.post(
        `https://soberlift.onrender.com/api/isRequestAccepted`,
        {
          requestId,
        }
      );
      console.log("Request status response: ", response.data);
      if (response.data == true) {
        console.log("Response is true, if statement");
        setRideAccepted(true);
        getRide(requestId);
        clearInterval(intervalId.current);
      }
    } catch (error) {
      console.error("Error checking request status: ", error);
    }
  };

  const onValidation = async () => {
    try {
      const response = await axios.post(
        `https://soberlift.onrender.com/api/createrequest`,
        newRequest
      );
      console.log("Request creation is successful: ", response.data);
      setOrdered(true);

      intervalId.current = setInterval(() => {
        console.log("Response request", response.data._id);
        checkRequestStatus(response.data._id);
      }, 3000);

      setTimeout(() => {
        clearInterval(intervalId.current);
        setOrdered(false);
      }, 60000);
    } catch (error) {
      console.error("Request creation failed with error: ", error);
    }
  };

  const getDriverLocation = async (driverId) => {
    await axios
      .post(`https://soberlift.onrender.com/api/getDriverLocation`, {
        driverId,
      })
      .then((response) => {
        setDriverLocation(response.data);
        console.log("Location response of driver", response.data);
      })
      .catch((error) => {
        console.error("Driver location can not be fetched: ", error.message);
      });
  };

  useEffect(() => {
    const calculateDistance = async () => {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originPlaceLocation.lat},${originPlaceLocation.lng}&destinations=${destinationPlaceLocation.lat},${destinationPlaceLocation.lng}&key=AIzaSyCs4CFoDHas00xgk0CLFRxjLloQbbtzDM0`
        )
        .then((response) => {
          setRideInfo(response.data.rows[0].elements[0]);
        })
        .catch((error) => {
          console.error(error.message);
        });
    };

    calculateDistance();
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
  };

  const finishRide = async () => {
    console.log("Arrived at the destination location");
    setFinished(true);

    await axios
      .put(`https://soberlift.onrender.com/api/finishRide/${ride._id}`)
      .then((response) => {
        console.log("Ride finished, status changed to: ", response.data.status);
      })
      .catch((error) => {
        console.error("Ride can not be finished : ", error.message);
      });
  };
  useEffect(() => {
    let driverLocationInterval;

    if (rideAccepted && ride) {
      driverLocationInterval = setInterval(() => {
        getDriverLocation(ride.driver._id);
      }, 3000);
    }

    return () => {
      clearInterval(driverLocationInterval);
    };
  }, [rideAccepted, ride]);

  useEffect(() => {
    if (driverLocation) {
      const threshold = 200;

      if (!pickedUp) {
        console.log("Salam");
        const distanceToPickup = calculateDistance(
          driverLocation.latitude,
          driverLocation.longitude,
          origin.latitude,
          origin.longitude
        );
        if (distanceToPickup <= threshold) {
          handlePickUp();
        }
      }

      if (pickedUp && !finished) {
        const distanceToDropOff = calculateDistance(
          driverLocation.latitude,
          driverLocation.longitude,
          destination.latitude,
          destination.longitude
        );
        if (distanceToDropOff <= threshold) {
          finishRide();
        }
      }
    }
  }, [driverLocation]);
  const handleRatingCancel = () => {
    navigation.navigate("Home");
  };

  const handleRatingSubmit = async (rating) => {
    await axios
      .post(
        `https://soberlift.onrender.com/api/rateDriver/${ride.driver._id}`,
        {
          rating,
        }
      )
      .then((response) => {
        console.log("Rating added to database: ", response.data);
      })
      .catch((error) => {
        console.error(error.message);
        console.log("Rating can not added");
      });
    // Request to add rating to Client
    console.log("Rating by client: ", rating);

    navigation.navigate("Home");
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      clearInterval(intervalId.current);
      clearInterval(driverLocationIntervalId.current);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <>
      {finished ? (
        <RateClient
          onCancel={handleRatingCancel}
          onSubmit={handleRatingSubmit}
        />
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.04,
            }}
            showsUserLocation={true}
          >
            {!pickedUp && (
              <>
                <MapViewDirections
                  origin={driverLocation || origin}
                  destination={origin}
                  apikey="AIzaSyCs4CFoDHas00xgk0CLFRxjLloQbbtzDM0"
                  strokeWidth={2}
                  strokeColor="blue"
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
              </>
            )}

            <MapViewDirections
              origin={{
                latitude:
                  pickedUp && driverLocation
                    ? driverLocation.latitude
                    : origin.latitude,
                longitude:
                  pickedUp && driverLocation
                    ? driverLocation.longitude
                    : origin.longitude,
              }}
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

            {driverLocation && (
              <Marker
                coordinate={{
                  latitude: driverLocation.latitude,
                  longitude: driverLocation.longitude,
                }}
                title="Driver"
                description="Driver's Location"
              >
                <Image
                  style={{ width: 40, height: 40, resizeMode: "contain" }}
                  source={require("../../assets/images/driverLocation.png")}
                />
              </Marker>
            )}
          </MapView>
          <View style={styles.details}>
            {!rideAccepted ? (
              <View style={styles.locationDetails}>
                <LocationHolder
                  text={originPlace.data.description}
                  bottomBorder
                />
                <LocationHolder text={destinationPlace.data.description} />
              </View>
            ) : (
              <View style={styles.clientInfo}>
                <View style={styles.profilePhoto}>
                  <Image
                    style={{ width: 40, height: 40 }}
                    source={require("../../assets/favicon.png")}
                  />
                </View>
                {ride ? (
                  <>
                    <Text
                      style={styles.username}
                    >{`${ride.driver.name} ${ride.driver.surname}`}</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>
                        {`${ride.driver.rating.length === 0 ? "5" : ride.driver.rating}`}
                      </Text>
                      <MaterialIcons name="star" size={20} color="black" />
                    </View>
                  </>
                ) : null}
              </View>
            )}
            <View style={styles.calculatedRideDetails}>
              <View style={styles.rideInfoWrapper}>
                <Text>Distance</Text>
                {rideInfo && (
                  <Text style={styles.rideInfoText}>
                    {String(rideInfo.distance?.text)}
                  </Text>
                )}
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
                <Text style={styles.rideInfoText}>
                  {rideInfo?.duration?.text}
                </Text>
              </View>
            </View>
            <Pressable
              style={styles.chat}
              onPress={() =>
                navigation.navigate("Chat", {
                  ride,
                })
              }
            >
              <MaterialIcons name="chat" size={40} color="black" />
            </Pressable>

            {!ordered && !rideAccepted ? (
              <PrimaryButton
                color="black"
                textColor="white"
                onPress={onValidation}
              >
                Order Now
              </PrimaryButton>
            ) : rideAccepted ? (
              <PrimaryButton
                color="#e0e0e0"
                textColor="black"
                onPress={() => handleRideCancel(ride._id)}
              >
                Cancel ride
              </PrimaryButton>
            ) : (
              <>
                <ActivityIndicator size="large" color="black" />
                <Text>Waiting for driver response...</Text>
              </>
            )}
          </View>
        </>
      )}
    </>
  );
}

export default RideValidation;

const styles = StyleSheet.create({
  map: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  details: {
    flex: 2,
    gap: 15,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "space-around",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  clientInfo: {
    flex: 1,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  profilePhoto: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    borderRadius: 50,
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 15,
  },
  locationDetails: {
    width: "80%",
  },
  calculatedRideDetails: {
    width: "70%",
    marginTop: "5%",
    marginBottom: "7%",
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
  chat: {
    position: "absolute",
    top: -80,
    right: 20,
    backgroundColor: Colors.primaryYellow,
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
