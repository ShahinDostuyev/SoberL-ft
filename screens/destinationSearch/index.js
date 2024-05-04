import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PrimaryButton from "../../components/primaryButton";
import PlaceRow from "./PlaceRow";

function DestinationSearch({ navigation }) {
  const [originPlace, setoriginPlace] = useState(null);
  const [destinationPlace, setdestinationPlace] = useState(null);

  const onDestinationConfirmation = () => {
    navigation.navigate("RideValidation", {
      originPlace,
      destinationPlace,
    });
  };

  useEffect(() => {
    console.log(originPlace, destinationPlace);
  }, [originPlace, destinationPlace]);
  return (
    <>
      <SafeAreaView>
        <View style={styles.rootContainer}>
          <View style={styles.inputContainer}>
            <View style={styles.textInputWrapper}>
              <GooglePlacesAutocomplete
                placeholder="Where from"
                onPress={(data, details = null) => {
                  setoriginPlace({ data, details });
                  console.log(data, details);
                }}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{ listView: styles.listView }}
                query={{
                  key: "AIzaSyBQPnTNzSx6Q6nHJExZjslfgmOTubMl7EI",
                  language: "en",
                  components: "country:tr",
                }}
                renderRow={(data) => <PlaceRow data={data} />}
              />
            </View>
            <View style={styles.textInputWrapper}>
              <GooglePlacesAutocomplete
                placeholder="Where to"
                onPress={(data, details = null) => {
                  setdestinationPlace({ data, details });
                  console.log(data, details);
                }}
                fetchDetails
                enablePoweredByContainer={false}
                styles={{
                  listView: styles.listView,
                }}
                query={{
                  key: "AIzaSyBQPnTNzSx6Q6nHJExZjslfgmOTubMl7EI",
                  language: "en",
                }}
                renderRow={(data) => <PlaceRow data={data} />}
              />
            </View>
            <View style={styles.circle}></View>
            <View style={styles.line}></View>
            <View style={styles.square}></View>
          </View>
          <PrimaryButton onPress={onDestinationConfirmation}>
            Confirm
          </PrimaryButton>
        </View>
      </SafeAreaView>
    </>
  );
}

export default DestinationSearch;

const styles = StyleSheet.create({
  rootContainer: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 20,
  },
  inputContainer: {
    width: "96%",
    padding: 10,
    marginLeft: 30,
    alignItems: "center",
  },
  textInputWrapper: {
    width: "95%",
    height: 50,
  },

  textInput: {
    flex: 1,
    height: 40,
    width: 100,
    margin: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 20,
  },
  listView: {
    position: "absolute",
    top: 100,
    width: "105%",
    left: -20,
    right: 10,
    elevation: 3,
  },
  quickDestinationsContainer: { flex: 2 },
  quickDestination: {},
  searchResultsContainer: { flex: 3 },
  circle: {
    position: "absolute",
    top: 30,
    left: 0,
    width: 5,
    height: 5,
    backgroundColor: "black",
  },
  line: {
    width: 1,
    height: 40,
    backgroundColor: "black",
    position: "absolute",
    top: 38,
    left: 2,
  },
  square: {
    position: "absolute",
    top: 80,
    left: 0,
    width: 5,
    height: 5,
    borderRadius: 10,
    backgroundColor: "black",
  },
});
