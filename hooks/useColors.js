import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultColors = {
  darkblue: "#002e4d",
  lightblue: "#ccffff",
  red: "#7A0F0F",
  yellow: "#CD9E10",
  gray: "#333333",
};

const useColors = () => {
  const [colors, setColors] = useState(defaultColors);

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const storedColors = await AsyncStorage.getItem("@colors");
        if (storedColors) {
          setColors(JSON.parse(storedColors));
        } else {
          await AsyncStorage.setItem("@colors", JSON.stringify(defaultColors));
          setColors(defaultColors);
        }
      } catch (error) {
        console.log("Error fetching colors:", error);
      }
    };
    fetchColors();
  }, []);

  const saveColors = async (newColors) => {
    try {
      await AsyncStorage.setItem("@colors", JSON.stringify(newColors));
      setColors(newColors);
    } catch (error) {
      console.log("Error saving colors:", error);
    }
  };

  const resetColors = async () => {
    try {
      await AsyncStorage.setItem("@colors", JSON.stringify(defaultColors));
      setColors(defaultColors);
    } catch (error) {
      console.log("Error resetting colors:", error);
    }
  };

  return [colors, saveColors, resetColors];
};

export default useColors;
