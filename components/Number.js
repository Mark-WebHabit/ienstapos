import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";

const Number = ({ darkblue, number, icon = null, onClick }) => {
  const handleClick = () => {
    onClick(number);
  };

  return (
    <View style={styles.number}>
      <Pressable
        style={[
          styles.numberWrapper,
          { borderColor: icon ? "transparent" : darkblue },
        ]}
        onPress={() => handleClick()}
      >
        {!icon && <Text style={styles.numberText}>{number}</Text>}
        {icon && <Image source={icon} style={styles.icon} />}
      </Pressable>
    </View>
  );
};

export default Number;

const styles = StyleSheet.create({
  number: {
    width: "30%",
    aspectRatio: 1,
    padding: "5%",
  },
  numberWrapper: {
    flex: 1,
    borderWidth: 2,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },

  numberText: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
