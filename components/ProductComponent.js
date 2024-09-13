import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useContext } from "react";
import { StyleContext } from "../context/StyleContextProvider";

const ProductComponent = ({ product, handleAddOrder }) => {
  const { lightblue, title, body, span, darkblue } = useContext(StyleContext);
  return (
    <Pressable
      style={[
        styles.product,
        {
          backgroundColor: lightblue,
          borderColor: darkblue,
        },
      ]}
      onPress={() => handleAddOrder(product)}
    >
      <Text
        style={[
          styles.productName,
          { fontSize: body, fontWeight: "600", color: darkblue },
        ]}
      >
        {product.name}
      </Text>

      <View style={[styles.price, { backgroundColor: darkblue }]}>
        <Text style={[styles.priceText, { fontSize: body }]}>
          PHP {parseFloat(product.price).toFixed(2)}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductComponent;

const styles = StyleSheet.create({
  product: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: "space-between",
    overflow: "hidden",
    margin: 10,
    borderWidth: 2,
  },

  productName: {
    textAlign: "center",
    marginTop: 10,
  },

  price: {
    padding: 10,
  },
  priceText: { textAlign: "center", color: "white", fontWeight: "600" },
});
