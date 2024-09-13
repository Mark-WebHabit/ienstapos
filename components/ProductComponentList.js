import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { StyleContext } from "../context/StyleContextProvider";

const ProductComponentList = ({ product, handleAddOrder }) => {
  const { darkblue, title, span, body, lightblue } = useContext(StyleContext);
  return (
    <Pressable
      style={[
        styles.product,
        { backgroundColor: lightblue, borderColor: darkblue },
      ]}
      onPress={() => handleAddOrder(product)}
    >
      <Text style={[styles.productname, { fontSize: body, color: darkblue }]}>
        {product?.name}
      </Text>
      <Text style={[styles.productname, { fontSize: span, color: darkblue }]}>
        PHP {parseFloat(product?.price).toFixed(2)}
      </Text>
    </Pressable>
  );
};

export default ProductComponentList;

const styles = StyleSheet.create({
  product: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    marginVertical: 5,
  },

  productname: {
    fontWeight: "bold",
    fontFamily: "",
  },
});
