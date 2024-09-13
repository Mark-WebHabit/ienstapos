import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleContext } from "../context/StyleContextProvider";
import { DataContext } from "../context/DataContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const FloatingSidebar = ({ navigation }) => {
  const { title, header, darkblue, body } = useContext(StyleContext);
  const { showSidebar, setShowSidebar, user } = useContext(DataContext);
  const [role, setRole] = useState("cashier");

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const handleNavigate = (path) => {
    setShowSidebar(false);
    navigation.navigate(path);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Pressable
      style={[styles.wrapper, { display: showSidebar ? "flex" : "none" }]}
      onPress={() => setShowSidebar(false)}
    >
      <View style={[styles.container]}>
        <Pressable style={styles.header} onPress={() => setShowSidebar(false)}>
          <Image source={require("../assets/hamburger.png")} />
        </Pressable>

        <View style={styles.currentUSer}>
          <Image source={require("../assets/user.png")} />
          <Text
            style={[{ color: darkblue, fontSize: body, fontWeight: "600" }]}
          >
            {user?.username ?? "User"}
          </Text>
        </View>

        <Pressable style={styles.pages} onPress={() => handleNavigate("Main")}>
          <Image source={require("../assets/cashier.png")} />
          <Text
            style={[
              styles.text,
              { fontSize: header, fontWeight: "600", color: darkblue },
            ]}
          >
            Cashier
          </Text>
        </Pressable>
        <Pressable
          style={styles.pages}
          onPress={() => handleNavigate("Orders")}
        >
          <Image source={require("../assets/orders.png")} />
          <Text
            style={[
              styles.text,
              { fontSize: header, fontWeight: "600", color: darkblue },
            ]}
          >
            Orders
          </Text>
        </Pressable>
        <Pressable style={styles.pages} onPress={() => handleNavigate("Sales")}>
          <Image source={require("../assets/sale.png")} />
          <Text
            style={[
              styles.text,
              { fontSize: header, fontWeight: "600", color: darkblue },
            ]}
          >
            Sales
          </Text>
        </Pressable>
        {role && (
          <Pressable
            style={styles.pages}
            onPress={() => handleNavigate("Product")}
          >
            <Image source={require("../assets/menu.png")} />
            <Text
              style={[
                styles.text,
                { fontSize: header, fontWeight: "600", color: darkblue },
              ]}
            >
              Product
            </Text>
          </Pressable>
        )}

        <Pressable
          style={styles.pages}
          onPress={() => handleNavigate("Setting")}
        >
          <Image source={require("../assets/setting.png")} />
          <Text
            style={[
              styles.text,
              { fontSize: header, fontWeight: "600", color: darkblue },
            ]}
          >
            Setting
          </Text>
        </Pressable>
        <Pressable style={styles.pages} onPress={handleLogout}>
          <Image source={require("../assets/logout.png")} />
          <Text
            style={[
              styles.text,
              { fontSize: header, fontWeight: "600", color: darkblue },
            ]}
          >
            logout
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};

export default FloatingSidebar;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  container: {
    height: "100%",
    width: "40%",
    maxWidth: 220,
    backgroundColor: "white",
    borderRightWidth: 2,
    borderColor: "rgba(0,0,0,0.3)",
  },
  currentUSer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: "10%",
    gap: 10,
    marginBottom: "15%",
  },

  header: {
    alignItems: "flex-end",
    padding: 5,
    marginBottom: 20,
  },

  pages: {
    padding: 5,
    paddingLeft: "10%",
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    textTransform: "capitalize",
  },
});
