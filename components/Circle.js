import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { StyleContext } from "../context/StyleContextProvider";

const Circle = ({ shade }) => {
  const { darkblue } = useContext(StyleContext);
  return (
    <View
      style={[
        styles.circle,
        {
          borderColor: darkblue,
          backgroundColor: shade ? darkblue : "transparent",
        },
      ]}
    />
  );
};

export default Circle;

const styles = StyleSheet.create({
  circle: {
    width: 25,
    height: 25,
    borderRadius: 23,
    borderWidth: 2,
  },
});
