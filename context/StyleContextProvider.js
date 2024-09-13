import React, { createContext } from "react";
import useFontSizes from "../hooks/useFontSize";
import useColors from "../hooks/useColors";

export const StyleContext = createContext();

const StyleContextProvider = ({ children }) => {
  const [fontSizes, saveFontSizes, resetFontSizes] = useFontSizes();
  const [colors, saveColors, resetColors] = useColors();

  return (
    <StyleContext.Provider
      value={{
        ...fontSizes,
        ...colors,
        setTitle: (title) => saveFontSizes({ ...fontSizes, title }),
        setBody: (body) => saveFontSizes({ ...fontSizes, body }),
        setSpan: (span) => saveFontSizes({ ...fontSizes, span }),
        setHeader: (header) => saveFontSizes({ ...fontSizes, header }),
        saveTitleColor: (color) => saveColors({ ...colors, darkblue: color }),
        saveHeaderColor: (color) => saveColors({ ...colors, red: color }),
        saveBodyColor: (color) => saveColors({ ...colors, yellow: color }),
        saveSpanColor: (color) => saveColors({ ...colors, gray: color }),
        resetFontSizes,
        resetColors,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export default StyleContextProvider;
