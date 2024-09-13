import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { StyleContext } from "../context/StyleContextProvider";
import Container from "../components/Container";
import Circle from "../components/Circle";
import Number from "../components/Number";

import { getData, storeData } from "../utilities/asyncStorage";
import { DataContext } from "../context/DataContext";
import { hashPassword } from "../utilities/hashing";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const PinLogin = ({ navigation }) => {
  const { darkblue, body } = useContext(StyleContext);
  const { setInfo, setError, setLoading, user } = useContext(DataContext);
  const [username, setUsername] = useState("");
  const [pin, setPin] = useState("");

  useEffect(() => {
    if (user) {
      navigation.navigate("Main");
    }
  }, [user]);

  useEffect(() => {
    async function getStoreData() {
      const user = await getData("username");
      setUsername(user || "");
    }

    getStoreData();
  }, []);

  const handleAddNumber = (number) => {
    if (pin.length <= 3) {
      setPin((prev) => (prev += number));
    }
  };

  const handleDecreaseNumber = () => {
    if (pin.length >= 0) {
      setPin((prev) => prev.slice(0, -1));
    }
  };

  const handleSubmit = async () => {
    if (!username) {
      setError("Please provide your registered username");
      return;
    }

    if (!pin || pin.length < 4) {
      setError("Invalid Pin");
      return;
    }

    setLoading(true);
    try {
      const hashpin = await hashPassword(pin);

      const userRef = ref(db, "users");
      const userQeury = query(
        userRef,
        orderByChild("username"),
        equalTo(username)
      );
      const userSnapshots = await get(userQeury);

      if (!userSnapshots.exists()) {
        setError("Account not found");
        return;
      }
      const datas = userSnapshots.val();
      const keys = Object.keys(datas);

      const user = datas[keys[0]];

      const authUSer = await signInWithEmailAndPassword(
        auth,
        user.email,
        hashpin
      );
      if (authUSer.user?.email) {
        await storeData("username", username);
        setPin("");
        navigation.navigate("Main");
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />

        <View style={styles.userContainer}>
          <Text style={styles.user}>Logging in as:</Text>

          <View style={styles.usernameContainer}>
            <TextInput
              placeholder="Hello! What's your username? "
              style={styles.username}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Image source={require("../assets/edit.png")} style={styles.edit} />
          </View>
        </View>

        <View style={styles.circles}>
          <Circle pin={pin} shade={pin.length >= 1} />
          <Circle pin={pin} shade={pin.length >= 2} />
          <Circle pin={pin} shade={pin.length >= 3} />
          <Circle pin={pin} shade={pin.length == 4} />
        </View>

        <View style={styles.keyboardNumber}>
          {Array.from({ length: 9 }).map((_, i) => (
            <Number
              darkblue={darkblue}
              number={i + 1}
              key={i}
              onClick={handleAddNumber}
            />
          ))}
          <Number
            darkblue={darkblue}
            icon={require("../assets/next.png")}
            onClick={handleSubmit}
          />
          <Number darkblue={darkblue} number={0} onClick={handleAddNumber} />
          <Number
            darkblue={darkblue}
            icon={require("../assets/delete.png")}
            next={false}
            onClick={handleDecreaseNumber}
          />
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={[{ fontSize: body, marginTop: 10 }]}>
              Create an account
            </Text>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default PinLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },

  userContainer: {
    alignItems: "center",
  },

  user: {
    fontSize: 18,
  },

  usernameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  username: {
    color: "#002e4d",
    fontSize: 15,
    textAlign: "center",
  },

  logo: {
    resizeMode: "contain",
    width: 180,
    height: 140,
  },

  circles: {
    flexDirection: "row",
    gap: 20,
  },

  keyboardNumber: {
    width: "45%",
    maxWidth: 420,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    alignContent: "flex-start",
    padding: "5%",
    paddingTop: "1%",
  },
});
