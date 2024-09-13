import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { StyleContext } from "../context/StyleContextProvider";

const MadeOrdersTableStyle = ({ filteredOrders, onClick }) => {
  const { darkblue, red, title, header, span } = useContext(StyleContext);

  const Product = ({ order, onClick }) => {
    return (
      <Pressable
        style={[
          styles.wrapper,
          { borderColor: order?.priority ? red : darkblue },
        ]}
        onPress={() => onClick(order)}
      >
        <View style={styles.orderNumberWrapper}>
          <Text
            style={[
              styles.orderNumber,
              {
                color: order?.priority ? red : darkblue,
                fontSize: header * 1.5,
                fontWeight: "bold",
              },
            ]}
          >
            {order?.orderNumber}
          </Text>
        </View>

        <View style={[styles.priceAndRef, { backgroundColor: darkblue }]}>
          <Text
            style={[
              styles.price,
              { fontSize: title, color: "white", fontWeight: "bold" },
            ]}
          >
            {order?.fees?.grandTotal.toFixed(2)}
          </Text>
          <Text
            style={[
              styles.ref,
              { fontSize: span, color: "white", fontWeight: "bold" },
            ]}
          >
            {order?.reference}
          </Text>
        </View>
      </Pressable>
    );
  };

  const renderItem = ({ item }) =>
    !item.paid && <Product order={item} onClick={onClick} />;

  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      {filteredOrders && filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          numColumns={4} // Adjust the number of columns as needed
          contentContainerStyle={styles.listContentContainer}
        />
      ) : (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>No orders have been made yet.</Text>
        </View>
      )}
    </View>
  );
};

export default MadeOrdersTableStyle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContentContainer: {
    gap: 10,
    padding: 10,
    flexGrow: 1,
  },
  wrapper: {
    width: "23%",
    aspectRatio: 1,
    borderRadius: 15,
    borderWidth: 2,
    overflow: "hidden",
    margin: 5,
  },
  orderNumberWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  priceAndRef: {
    padding: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noOrdersText: {
    fontSize: 18,
    color: "#888",
  },
});
