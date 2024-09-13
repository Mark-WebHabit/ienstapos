import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultFontSizes = {
  title: 20,
  body: 18,
  span: 13,
  header: 25,
};

const useFontSizes = () => {
  const [fontSizes, setFontSizes] = useState(defaultFontSizes);

  useEffect(() => {
    const loadFontSizes = async () => {
      try {
        const savedTitle = await AsyncStorage.getItem("title");
        const savedBody = await AsyncStorage.getItem("body");
        const savedSpan = await AsyncStorage.getItem("span");
        const savedHeader = await AsyncStorage.getItem("header");

        setFontSizes({
          title: savedTitle ? parseInt(savedTitle) : defaultFontSizes.title,
          body: savedBody ? parseInt(savedBody) : defaultFontSizes.body,
          span: savedSpan ? parseInt(savedSpan) : defaultFontSizes.span,
          header: savedHeader ? parseInt(savedHeader) : defaultFontSizes.header,
        });
      } catch (error) {
        console.error("Failed to load font sizes", error);
      }
    };

    loadFontSizes();
  }, []);

  const saveFontSizes = async (sizes) => {
    try {
      await AsyncStorage.multiSet([
        ["title", sizes.title.toString()],
        ["body", sizes.body.toString()],
        ["span", sizes.span.toString()],
        ["header", sizes.header.toString()],
      ]);
      setFontSizes(sizes);
    } catch (error) {
      console.error("Failed to save font sizes", error);
    }
  };

  const resetFontSizes = async () => {
    setFontSizes(defaultFontSizes);
    try {
      await AsyncStorage.multiRemove(["title", "body", "span", "header"]);
    } catch (error) {
      console.error("Failed to reset font sizes", error);
    }
  };

  return [fontSizes, saveFontSizes, resetFontSizes];
};

export default useFontSizes;
