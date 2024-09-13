import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

const InputFIeld = ({
  text,
  value,
  onChange,
  secure,
  keyboard = "default",
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = useRef(new Animated.Value(9)).current;

  const inputRef = useRef(null);

  useEffect(() => {
    if (value || isFocused) {
      setIsFocused(true);
    }
  }, [value, isFocused]);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused ? -24 : 8,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const labelColor = labelPosition.interpolate({
    inputRange: [-24, 8],
    outputRange: ["#002e4d", "#002e4d"],
  });

  return (
    <Pressable
      style={[
        styles.inputField,
        { borderColor: error ? "red" : "transparent" },
      ]}
      onPress={() => inputRef.current.focus()}
    >
      <Animated.Text
        style={[
          styles.label,
          {
            top: labelPosition,
            color: labelColor,
          },
        ]}
      >
        {text}
      </Animated.Text>
      <TextInput
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={inputRef}
        keyboardType={keyboard}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChange}
      />
      <Text style={styles.error}>{error}</Text>
    </Pressable>
  );
};

export default InputFIeld;

const styles = StyleSheet.create({
  inputField: {
    width: "75%",
    marginHorizontal: "auto",
    marginVertical: 14,
    backgroundColor: "#ccffff",
    borderRadius: 10,
    position: "relative",
    height: 40,
    paddingLeft: 15,
    position: "relative",
    borderWidth: 1,
  },

  label: {
    position: "absolute",
    fontSize: 16,
    left: 15,
    textTransform: "uppercase",
    fontWeight: "600",
  },

  input: {
    height: "100%",
    paddingLeft: 0,
    color: "#002e4d",
    fontSize: 18,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
});
