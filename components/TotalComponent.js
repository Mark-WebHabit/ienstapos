import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TotalComponent = ({ size, darkblue, red, body, label, value = 0 }) => {
  return (
    <View style={styles.totalCOntainer}>
      <Text
        style={[
          styles.label,
          { fontSize: size, fontWeight: "bold", color: darkblue },
        ]}
      >
        {label}:{" "}
      </Text>
      <Text
        style={[
          styles.label,
          { fontSize: body, fontWeight: "600", color: red },
        ]}
      >
        PHP {parseFloat(value).toFixed(2)}{" "}
      </Text>
    </View>
  );
};

export default TotalComponent;

const styles = StyleSheet.create({
  totalCOntainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
});
