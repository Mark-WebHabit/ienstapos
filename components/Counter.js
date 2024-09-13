import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext } from "react";
import { StyleContext } from "../context/StyleContextProvider";

const Counter = ({ value, setValue, label, onpress, data }) => {
  const { span, body, darkblue, title } = useContext(StyleContext);
  return (
    <View style={styles.container}>
      <Text style={[{ fontSize: span, fontWeight: "bold", lineHeight: span }]}>
        {label}
      </Text>
      <View style={styles.wrapper}>
        <Pressable onPress={() => onpress("increment", data.id)}>
          <Image source={require("../assets/increment.png")} />
        </Pressable>
        <TextInput
          value={value.toString()}
          style={[styles.input, { fontSize: title, color: darkblue }]}
          readOnly={true}
        />
        <Pressable onPress={() => onpress("decrement", data.id)}>
          <Image source={require("../assets/decrement.png")} />
        </Pressable>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    textAlign: "center",
    fontWeight: "bold",
  },
});
