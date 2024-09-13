import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

const FontSizeSlider = ({ label, value, onValueChange }) => {
  const handleChange = (newValue) => {
    onValueChange(newValue); // Update the font size immediately
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Slider
        style={styles.slider}
        minimumValue={10}
        maximumValue={50}
        value={value}
        onValueChange={handleChange} // Call handleChange when the slider value changes
        step={1}
      />
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default FontSizeSlider;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  slider: {
    flex: 3,
  },
  value: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
  },
});
