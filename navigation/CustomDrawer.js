import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useSelector } from "react-redux";

function CustomDrawer(props) {
  const user = useSelector((state) => state.user.user.client);

  return (
    <>
      <DrawerContentScrollView {...props}>
        <Pressable style={styles.accountInfo}>
          <View style={styles.profilePhoto}>
            <Image source={require("../assets/favicon.png")} />
          </View>
          <View style={styles.userInfo}>
            <Text
              style={styles.username}
            >{`${user.name} ${user.surname}`}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>{user.rating}</Text>
              <MaterialIcons name="star" size={20} color="black" />

            </View>
          </View>
        </Pressable>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </>
  );
}

export default CustomDrawer;

const styles = StyleSheet.create({
  accountInfo: {
    height: 100,
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 50,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    color: "white",
    fontSize: 15,
  },
});
