import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function LocationHolder({ text, bottomBorder = false }) {
  return (
    <View
      style={[
        styles.locationDetail,
        { borderBottomWidth: bottomBorder ? 0.4 : 0 },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
    
          name="navigation-variant"
          size={24}
          color="gray"
        />
        <Text style={styles.textInput}>{text}</Text>
      </View>
    </View>
  );
}

export default LocationHolder;

const styles = StyleSheet.create({
  locationDetail: {
    width: "90%",
    padding: 10,
    flexDirection: "row",
  },
  textInput: {
    fontSize: 18,
    marginLeft: 15,
    opacity: 0.5,
  },
});
