import React from "react";
import { StyleSheet, View, Text } from "react-native";
import RNColorPicker from "react-native-color-picker"; // Renaming the import

const CustomColorPicker = ({ label, color, onColorChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <RNColorPicker // Using the renamed component here
        style={styles.colorPicker}
        defaultColor={color}
        onColorSelected={onColorChange}
      />
    </View>
  );
};

export default CustomColorPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
    marginRight: 10,
  },
  colorPicker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
});
