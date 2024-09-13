import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import Order from "./Order";

const CashierOrder = ({
  orders,
  handleIncrementDecrement,
  hasOperation = true,
}) => {
  return (
    <View style={styles.orderContainerWrapper}>
      {orders && orders?.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={({ item }) => (
            <Order
              order={item}
              handleIncrementDecrement={handleIncrementDecrement}
              hasOperation={hasOperation}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={[{ fontSize: 30, textAlign: "center", marginTop: 40 }]}>
          No Order Selected
        </Text>
      )}
    </View>
  );
};

export default CashierOrder;

const styles = StyleSheet.create({
  orderContainerWrapper: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 10,
    paddingHorizontal: "5%",
    overflow: "hidden",
  },
});
