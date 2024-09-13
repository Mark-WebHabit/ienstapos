import { StyleSheet, Text, FlatList } from "react-native";
import React from "react";

import ProductComponentList from "./ProductComponentList";

const ProductListStyle = ({ products, handleAddOrder }) => {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <ProductComponentList product={item} handleAddOrder={handleAddOrder} />
      )}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ flexGrow: 1 }}
    />
  );
};

export default ProductListStyle;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
