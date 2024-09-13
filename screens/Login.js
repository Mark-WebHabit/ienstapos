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

const Login = ({ navigation }) => {
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

                <Text style={styles.title}>Login</Text>
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
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text style={styles.link}>Create an account</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ccffff",
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
