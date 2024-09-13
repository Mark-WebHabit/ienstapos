import { Platform, StatusBar, StyleSheet, View } from "react-native";
import React from "react";

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#ccffff",
  },
});
