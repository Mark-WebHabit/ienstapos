import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";

import Container from "../components/Container";
import InputFIeld from "../components/InputFIeld";
import Button from "../components/Button";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";

// utilities
import {
  validateEmail,
  validateUsername,
  validatePincode,
} from "../utilities/input";
import { hashPassword } from "../utilities/hashing";
import { DataContext } from "../context/DataContext";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { uploadAdminUSerToDatabase } from "../utilities/Role";

const RegisterAdmin = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    pincode: "",
    systemPin: "",
  });
  const { SYSTEM_PIN, setLoading, setError, setInfo, user } =
    useContext(DataContext);

  useEffect(() => {
    if (user) {
      navigation.navigate("Main");
    }
  }, [user]);

  const checkUsernameExists = async (username) => {
    try {
      const usernameRef = ref(db, `users`);
      const userQuery = query(
        usernameRef,
        orderByChild("username"),
        equalTo(username)
      );
      const snapshot = await get(userQuery);
      return snapshot.exists();
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async () => {
    const { email, username, pincode, systemPin } = formData;

    if (!validateEmail(email)) {
      setError("Invalid email format");
      return;
    }

    if (!validateUsername(username)) {
      setError("Username must not contain special characters");
      return;
    }

    if (systemPin !== SYSTEM_PIN) {
      setError("Invalid System Pincode");
      return;
    }

    if (!validatePincode(pincode)) {
      setError("Pincode must be exactly 4 numeric characters");
      return;
    }

    // Check if the username is already taken
    setLoading(true);
    try {
      // Query your database to check if the username exists
      // Replace this with your actual query logic
      const usernameExists = await checkUsernameExists(username);
      if (usernameExists) {
        setError("Username is already taken");
        return;
      }

      // If all validations pass, you can proceed with the form submission logic
      setError(null); // Clear error if any

      const hashPin = await hashPassword(pincode);

      const userSnap = await createUserWithEmailAndPassword(
        auth,
        email,
        hashPin
      );
      const user = userSnap.user;

      if (user) {
        await updateProfile(user, {
          displayName: username,
        });

        await uploadAdminUSerToDatabase(user.uid, email, username);

        // await sendEmailVerification(user);
      }
      await signOut(auth);

      setInfo("Registered Successfully");
      setFormData({
        email: "",
        username: "",
        pincode: "",
        systemPin: "",
      });
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <View style={styles.form}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                  />
                </View>

                <Text style={styles.title}>Register Admin</Text>
                <InputFIeld
                  text="Email"
                  value={formData.email}
                  onChange={(text) =>
                    setFormData((prevData) => ({ ...prevData, email: text }))
                  }
                />
                <InputFIeld
                  text="Username"
                  value={formData.username}
                  onChange={(text) =>
                    setFormData((prevData) => ({ ...prevData, username: text }))
                  }
                />
                <InputFIeld
                  text="System Pin"
                  value={formData.systemPin}
                  secure={true}
                  onChange={(text) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      systemPin: text,
                    }))
                  }
                />
                <InputFIeld
                  text="Pincode"
                  secure={true}
                  keyboard="numeric"
                  value={formData.pincode}
                  onChange={(text) =>
                    setFormData((prevData) => ({ ...prevData, pincode: text }))
                  }
                />
                <Button onClick={handleSubmit} />
                <Pressable onPress={() => navigation.navigate("Pin")}>
                  <Text style={styles.link}>Already have an account</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default RegisterAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "50%",
    maxWidth: 500,
    aspectRatio: 4 / 3,
    borderRadius: 15,
    backgroundColor: "#66d9ff",
    position: "relative",
    paddingTop: 75,
  },
  logoContainer: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "#66d9ff",
    top: -75,
    left: "50%",
    transform: [{ translateX: -75 }],
  },
  logo: {
    resizeMode: "contain",
    width: "85%",
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    textTransform: "uppercase",
    color: "#002e4d",
    fontWeight: "bold",
    marginBottom: 10,
  },

  link: {
    marginVertical: 12,
    textAlign: "center",
    fontSize: 16,
    color: "#002e4d",
  },
});
