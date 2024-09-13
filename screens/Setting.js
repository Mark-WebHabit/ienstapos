import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Pressable,
  Image,
} from "react-native";
import { StyleContext } from "../context/StyleContextProvider";
import Container from "../components/Container";
import FontSizeSlider from "../components/FontSizeSlider";
import { DataContext } from "../context/DataContext";
import FloatingSidebar from "../components/FloatingSidebar";

const Setting = ({ navigation }) => {
  const {
    title,
    body,
    span,
    header,
    setTitle,
    setBody,
    setSpan,
    setHeader,
    resetFontSizes,
  } = useContext(StyleContext);

  const { setShowSidebar, user } = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Pin");
    }
  }, [user]);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <FloatingSidebar navigation={navigation} />
        <Pressable
          style={styles.absolute}
          onPress={() => {
            setShowSidebar(true);
          }}
        >
          <Image source={require("../assets/hamburger.png")} />
        </Pressable>
        <Text style={[styles.previewText, { fontSize: title }]}>
          Title Preview
        </Text>
        <Text style={[styles.previewText, { fontSize: header }]}>
          Header Preview
        </Text>
        <Text style={[styles.previewText, { fontSize: body }]}>
          Body Preview
        </Text>
        <Text style={[styles.previewText, { fontSize: span }]}>
          Span Preview
        </Text>

        <FontSizeSlider label="Title" value={title} onValueChange={setTitle} />
        <FontSizeSlider
          label="Header"
          value={header}
          onValueChange={setHeader}
        />
        <FontSizeSlider label="Body" value={body} onValueChange={setBody} />
        <FontSizeSlider label="Span" value={span} onValueChange={setSpan} />

        <Button title="Reset" onPress={resetFontSizes} />
      </ScrollView>
    </Container>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
    position: "relative",
    zIndex: 1,
    paddingHorizontal: "10%",
  },
  previewText: {
    marginBottom: 10,
    textAlign: "center",
  },
  absolute: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
