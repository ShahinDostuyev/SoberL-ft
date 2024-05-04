import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const user = {
  name: "Shahin",
  surname: "Dostuyev",
  rating: "4.8",
  containerWithIcon: "Karapinar mahallesi, Izmir",
};

function ProfileScreen() {
  return (
    <>
      <View style={styles.rootContainer}>
        <View style={styles.accountInfo}>
          <View style={styles.profilePhoto}>
            <Image
              style={{ width: 40, height: 40 }}
              source={require("../../assets/favicon.png")}
            />
          </View>
          <Text style={styles.username}>{`${user.name} ${user.surname}`}</Text>
          <Text style={styles.rating}>{`${user.rating} Rating`}</Text>
        </View>
        <View style={styles.savedPlacesContainer}>
          <Text style={styles.username}> Saved Places</Text>
          <View style={styles.containerWithIcon}>
            <MaterialCommunityIcons name="home-roof" size={40} color="black" />
            <View>
              <Text style={styles.titleText}>Home</Text>
              <Text>{user.containerWithIcon}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.accountOut, { justifyContent: "flex-end" }]}>
          <Pressable style={styles.containerWithIcon}>
            <MaterialCommunityIcons name="logout" size={35} color="black" />
            <Text style={styles.titleText}>Logout</Text>
          </Pressable>
          <View style={styles.seperator} />
          <Pressable style={styles.containerWithIcon}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={35}
              color="black"
            />
            <Text style={styles.titleText}>Delete Account</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#c8c8c8",
    gap: 10,
  },
  accountInfo: {
    backgroundColor: "white",
    paddingVertical: 30,
    borderBottomEndRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: "center",
    gap: 10,
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
  rating: {
    fontSize: 15,
  },
  savedPlacesContainer: {
    backgroundColor: "white",
    gap: 15,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  containerWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  titleText: { fontSize: 18, fontWeight:"500"},
  accountOut: {
    backgroundColor: "white",
    gap: 15,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  seperator: {
    width: "100%",
    borderWidth: 1,
    opacity: 0.2,
    borderColor: "black",
  },
});
