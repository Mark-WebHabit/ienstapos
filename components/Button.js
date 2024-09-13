import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const Button = ({ text = "Submit", onClick }) => {
  return (
    <Pressable style={styles.container} onPress={onClick}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: "75%",
    marginHorizontal: "auto",
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#002e4d",
    marginTop: 10,
  },
  text: {
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
  },
});
