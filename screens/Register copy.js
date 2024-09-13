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
import React, { useState } from "react";

import Container from "../components/Container";
import InputFIeld from "../components/InputFIeld";
import Button from "../components/Button";

const Register = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    pincode: "",
  });

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

                <Text style={styles.title}>Register</Text>
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
                  text="Pincode"
                  secure={true}
                  keyboard="numeric"
                  value={formData.pincode}
                  onChange={(text) =>
                    setFormData((prevData) => ({ ...prevData, pincode: text }))
                  }
                />
                <Button />
                <View style={styles.links}>
                  <Pressable onPress={() => navigation.navigate("Pin")}>
                    <Text style={styles.link}>Aleady have an account</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => navigation.navigate("RegisterAdmin")}
                  >
                    <Text style={styles.link}>Register Admin</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Register;

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

  links: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
});