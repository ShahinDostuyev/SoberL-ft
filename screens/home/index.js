import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
function HomeScreen() {
  return (
    <>
      <View style={styles.map}>
        <Text>Map screen</Text>
      </View>
      <View style={styles.operations}>
        <View style={styles.searchInputField}>
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
          <View style={styles.timeSelector}>
            <Ionicons name="time-sharp" size={24} color="black" />
            <Text style={{ fontSize: 20 }}>Now</Text>
            <AntDesign name="down" size={24} color="black" />
          </View>
        </View>
      </View>
    </>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  map: {
    flex: 2,
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
  },
  operations: { flex: 1, backgroundColor: "purple" },
  searchInputField: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    fontSize: 24,
    marginLeft: 15,
  },
  timeSelector: {
    width:"30%",
    backgroundColor: "gray",
    borderRadius:25,
    height: "90%",
    marginRight: 2,
    padding:10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    opacity:0.8
  },
});
