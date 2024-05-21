import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { cleanUser, updateUser } from "../../redux/actions";
import axios from "axios";

function ProfileScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.client);
  console.log(user);
  const [name, setname] = useState(user.name);
  const [surname, setsurname] = useState(user.surname);
  const [email, setemail] = useState(user.email);
  const [isEditing, setIsEditing] = useState(false);

  const [errors, setErrors] = useState({});
  const logOut = () => {
    dispatch(cleanUser());
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name cannot be empty";
    }
    if (!surname.trim()) {
      newErrors.surname = "Surname cannot be empty";
    }
    if (!email.trim()) {
      newErrors.email = "Email cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email format is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleEdit = () => {
    if (isEditing) {
      if (!validateInputs()) {
        return;
      }
      dispatch(updateUser({ name, surname, email }));

      // Save changes to the store or server here if needed
      const putProfielChanges = async () => {
        try {
          const response = await axios.put(
            `https://soberlift.onrender.com/api/updateclientdetails`,
            {
              clientId: user._id,
              name: String(name),
              surname: String(surname),
              email: String(email),
            }
          );
          console.log(response.data);
        } catch (error) {
          console.warn(error);
        }
      };
      putProfielChanges();
    }
    setIsEditing(!isEditing);
  };

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
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileInfoHeader}>
            <Text style={styles.username}> Profile Info</Text>
            <Pressable onPress={toggleEdit}>
              <MaterialCommunityIcons
                name={isEditing ? "check" : "account-edit-outline"}
                size={36}
                color="black"
              />
            </Pressable>
          </View>

          <View style={styles.containerWithIcon}>
            <MaterialCommunityIcons
              name="account-outline"
              size={36}
              color="black"
            />
            <View>
              <Text style={styles.titleText}>Name</Text>
              <TextInput
                editable={isEditing}
                value={name}
                onChangeText={setname}
                style={isEditing ? styles.inputEditable : styles.input}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
          </View>
          <View style={styles.containerWithIcon}>
            <MaterialCommunityIcons
              name="account-outline"
              size={36}
              color="black"
            />
            <View>
              <Text style={styles.titleText}>Surname</Text>
              <TextInput
                editable={isEditing}
                value={surname}
                onChangeText={setsurname}
                style={isEditing ? styles.inputEditable : styles.input}
              />
              {errors.surname && (
                <Text style={styles.errorText}>{errors.surname}</Text>
              )}
            </View>
          </View>
          <View style={styles.containerWithIcon}>
            <MaterialCommunityIcons
              name="email-outline"
              size={36}
              color="black"
            />
            <View>
              <Text style={styles.titleText}>Email</Text>
              <TextInput
                editable={isEditing}
                value={email}
                onChangeText={setemail}
                style={isEditing ? styles.inputEditable : styles.input}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={[styles.accountOut, { justifyContent: "flex-end" }]}>
          <Pressable style={styles.containerWithIcon} onPress={logOut}>
            <MaterialCommunityIcons
              name="logout"
              size={35}
              color="black"
              style={{ marginLeft: 2 }}
            />
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
  titleText: { fontSize: 18, fontWeight: "500" },
  profileInfoContainer: {
    backgroundColor: "white",
    gap: 15,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  profileInfoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    color: "black",
  },
  inputEditable: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    color: "black",
    padding: 0,
  },
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
