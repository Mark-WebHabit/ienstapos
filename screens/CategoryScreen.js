import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Container from "../components/Container";

const CategoryScreen = () => {
  return (
    <Container>
      <View style={styles.container}>
        <Text>CategoryScreen</Text>
      </View>
    </Container>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "white",
  },
});
