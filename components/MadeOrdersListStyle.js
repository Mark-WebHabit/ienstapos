import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { StyleContext } from "../context/StyleContextProvider";

const MadeOrdersListStyle = ({ filteredOrders, onClick }) => {
  const { darkblue, red, title, header, span } = useContext(StyleContext);
  const Product = ({ order, onClick }) => (
    <Pressable
      style={[
        styles.wrapper,
        { backgroundColor: order?.priority ? red : darkblue },
      ]}
      onPress={() => onClick(order)}
    >
      <View style={styles.orderNumberWrapper}>
        <Text
          style={[
            styles.orderNumber,
            {
              color: "white",
              fontSize: header * 1.5,
              fontWeight: "bold",
            },
          ]}
        >
          {order?.orderNumber}
        </Text>
      </View>

      <View style={styles.orderWrapper}>
        <Text
          style={[
            styles.price,
            {
              fontSize: title,
              color: "white",
              fontWeight: "bold",
            },
          ]}
        >
          PHP {order.fees.grandTotal}
        </Text>
        <Text
          style={[
            styles.price,
            {
              fontSize: span,
              color: "white",
              fontWeight: "bold",
            },
          ]}
        >
          Ref: {order.reference}
        </Text>
      </View>
    </Pressable>
  );

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
          numColumns={2} // Adjust the number of columns as needed
          contentContainerStyle={styles.listContentContainer}
          key={2}
        />
      ) : (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>No orders have been made yet.</Text>
        </View>
      )}
    </View>
  );
};

export default MadeOrdersListStyle;

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
    width: "45%",
    borderRadius: 15,
    borderWidth: 2,
    overflow: "hidden",
    margin: 5,
    flexDirection: "row",
  },
  orderNumberWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  orderWrapper: {
    flex: 1,
  },
  price: {
    textAlign: "center",
    marginVertical: 5,
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
