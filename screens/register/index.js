import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import PrimaryButton from "../../components/primaryButton";

// Function to check password requirements
const checkPasswordRequirements = (password) => {
  const requirements = [
    {
      satisfied: /[A-Z]/.test(password),
      message: "Must contain at least one uppercase letter",
    },
    {
      satisfied: /\d/.test(password),
      message: "Must contain at least one number",
    },
    {
      satisfied: /\W|_/.test(password),
      message: "Must contain at least one special character",
    },
    {
      satisfied: password.length >= 8,
      message: "Must be at least 8 characters long",
    },
  ];

  return requirements;
};

// Define validation schema with Yup
const registerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required")
    .matches(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Invalid email"
    ),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]{11}$/, "Invalid contact number"),
  password: Yup.string().required("Password is required"),
});

const RegisterPage = () => {
  const [selectedRole, setselectedRole] = useState("Client");
  console.log(selectedRole);

  // Function to handle form submission
  const handleRegistration = (values) => {
    // Add your registration logic here
    console.log("Registration values:", values);
    navigation.navigate("Home")

  };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require("../../assets/images/driver2.jpg")}
      resizeMode="cover"
      imageStyle={{ opacity: 0.95 }}
    >
      <View style={styles.rootContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.roleSelector}>
            <TouchableOpacity
              style={{
                width: "50%",
                height: 40,
                backgroundColor: selectedRole == "Client" ? "blue" : "white",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setselectedRole("Client");
              }}
            >
              <Text
                style={{
                  color: selectedRole == "Client" ? "white" : "black",
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Client
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                height: 40,
                backgroundColor: selectedRole == "Driver" ? "blue" : "white",
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                setselectedRole("Driver");
              }}
            >
              <Text
                style={{
                  color: selectedRole == "Driver" ? "white" : "black",
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                Driver
              </Text>
            </TouchableOpacity>
          </View>

          {/* Formik component for handling forms */}
          <Formik
            initialValues={{
              name: "",
              surname: "",
              email: "",
              contactNumber: "",
              password: "",
            }}
            validationSchema={registerSchema}
            onSubmit={handleRegistration}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid, // Formik prop to check if the form is valid
            }) => (
              <View style={{ width: "100%", alignItems: "center" }}>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Surname"
                  onChangeText={handleChange("surname")}
                  onBlur={handleBlur("surname")}
                  value={values.surname}
                />
                {touched.surname && errors.surname && (
                  <Text style={styles.errorText}>{errors.surname}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="Contact number"
                  onChangeText={handleChange("contactNumber")}
                  onBlur={handleBlur("contactNumber")}
                  value={values.contactNumber}
                  keyboardType="phone-pad"
                />
                {touched.contactNumber && errors.contactNumber && (
                  <Text style={styles.errorText}>{errors.contactNumber}</Text>
                )}

                <TextInput
                  style={styles.input}
                  placeholder="example@example.com"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

                {/* Password input */}
                <TextInput
                  style={styles.input}
                  placeholder="**********"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                {/* Display password requirements */}
                {values.password && (
                  <View>
                    {checkPasswordRequirements(values.password).every(
                      (requirement) => requirement.satisfied
                    )
                      ? null
                      : checkPasswordRequirements(values.password).map(
                          (requirement, index) => (
                            <Text
                              key={index}
                              style={{
                                color: requirement.satisfied ? "green" : "red",
                              }}
                            >
                              {requirement.message}
                            </Text>
                          )
                        )}
                  </View>
                )}

                {/* Submit button - Disable if the form is not valid */}
                <PrimaryButton
                  onPress={() => handleRegistration(values)}
                  disabled={!isValid}
                >
                  Register
                </PrimaryButton>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: 250,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  roleSelector: {
    width: "85%",
    height: 50,
    marginVertical: 20,
    borderWidth: 0.5,
    borderRadius: 15,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  input: {
    height: 40,
    width: "90%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 15,
    padding: 8,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  requirementsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
});

export default RegisterPage;
