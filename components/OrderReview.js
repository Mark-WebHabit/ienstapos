import { StyleSheet, Text, View } from "react-native";
import React from "react";

import CashierOrder from "./CashierOrder";

const OrderReview = ({ selectedOrder }) => {
  return (
    <View style={styles.container}>
      <CashierOrder orders={selectedOrder.orders} hasOperation={false} />
    </View>
  );
};

export default OrderReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
