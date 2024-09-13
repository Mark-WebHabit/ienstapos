import { StyleSheet, FlatList } from "react-native";
import React from "react";
import ProductComponent from "./ProductComponent";

const ProductTableStyle = ({ products, handleAddOrder }) => {
  // dummy products

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductComponent product={item} handleAddOrder={handleAddOrder} />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      key={3} // Add this line to force re-render when numColumns changes
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

export default ProductTableStyle;
