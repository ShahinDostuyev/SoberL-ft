import { Entypo } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

function PlaceRow({data}) {
  return (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Entypo name="location-pin" size={20} color={"white"} />
      </View>
      <Text styles={styles.locationText}>{data.description}</Text>
    </View>
  );
}

export default PlaceRow;

const styles = StyleSheet.create({
    row:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:5
    },
    iconContainer:{
        backgroundColor:"#a2a2a2",
        padding:5,
        borderRadius:50,
        marginRight:15

    }
});
