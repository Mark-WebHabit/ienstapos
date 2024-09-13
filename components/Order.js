import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext } from "react";
import { StyleContext } from "../context/StyleContextProvider";

import Counter from "./Counter";

const Order = ({ order, handleIncrementDecrement, hasOperation }) => {
  const { title, body, span, darkblue, lightblue } = useContext(StyleContext);
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: lightblue, borderColor: darkblue },
      ]}
    >
      <View style={styles.orderWrapper}>
        <View style={styles.textInfo}>
          <Text
            style={[
              styles.productName,
              { fontSize: body, color: darkblue, fontWeight: "600" },
            ]}
          >
            {order.name}
          </Text>
          <Text>--</Text>
          <Text
            style={[
              styles.amount,
              { fontSize: span, color: darkblue, fontWeight: "600" },
            ]}
          >
            PHP {parseFloat(order.price).toFixed(2)}
          </Text>
        </View>
        {hasOperation && (
          <View style={styles.inlineOp}>
            <Counter
              value={order.quantity}
              data={order}
              label={"Quantity"}
              onpress={handleIncrementDecrement}
            />
          </View>
        )}
        <Text style={[{ fontSize: span, fontWeight: "bold", color: darkblue }]}>
          Quantity: {order.quantity}
        </Text>
      </View>
      {hasOperation && (
        <Pressable onPress={() => handleIncrementDecrement("remove", order.id)}>
          <Image source={require("../assets/remove.png")} />
        </Pressable>
      )}
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 5,
  },

  inlineOp: {
    flexDirection: "row",
    alignItems: "center",
  },

  textInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
});
