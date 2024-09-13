import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";

import Container from "../components/Container";
import FloatingSidebar from "../components/FloatingSidebar";
import OrdersHeader from "../components/OrdersHeader";
import OrderSummaryComponent from "../components/OrderSummaryComponent";
import ReferenceDT from "../components/ReferenceD&T";

import { StyleContext } from "../context/StyleContextProvider";
import { formatCurrentDate, formatCurrentDateTime } from "../utilities/date";

import MadeOrdersTableStyle from "../components/MadeOrdersTableStyle";
import MadeOrdersListStyle from "../components/MadeOrdersListStyle";
import OrderReview from "../components/OrderReview";

import { DataContext } from "../context/DataContext";
import { ref, get, update } from "firebase/database";
import { db } from "../firebase";

const Orders = ({ navigation }) => {
  const { darkblue, title, red, span, header } = useContext(StyleContext);
  const { user, dateBasedOrders, date } = useContext(DataContext);
  const [isTable, setIsTable] = useState(true);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);

  // to be pushed
  const [selectedOrder, setSelectedOrder] = useState([]);

  // handle UAC
  useEffect(() => {
    if (!user) {
      navigation.navigate("Pin");
    }
  }, [user]);

  useEffect(() => {
    const filtered = dateBasedOrders.filter((order) => order?.status == "paid");
    setOrders(filtered || []);
  }, [dateBasedOrders]);

  useEffect(() => {
    if (orders.length > 0) {
      const totalGrandTotal = orders.reduce((sum, order) => {
        return sum + order.fees.grandTotal;
      }, 0);

      setTotal(totalGrandTotal);
    }
  }, [orders]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  useEffect(() => {
    const searchResult = orders.filter((order) => {
      return order.reference.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredOrders(searchResult);
  }, [search, orders]); // Include 'orders' as dependency

  useEffect(() => {
    let data;

    if (filter === "Priority") {
      data = orders.filter((order) => order?.priority);
    } else {
      data = orders;
    }

    setFilteredOrders(data);
  }, [filter, orders]); // Include 'orders' as dependency
  return (
    <Container>
      <FloatingSidebar navigation={navigation} />
      <View style={styles.container}>
        {/* section for orders */}
        <View style={styles.orders}>
          <OrdersHeader
            isTable={isTable}
            setIsTable={setIsTable}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            hasCalendar={true}
          />
          <Text style={[styles.date, { fontSize: title, color: darkblue }]}>
            Sales -- {formatCurrentDate(date)}
          </Text>
          <Text
            style={[
              {
                fontSize: header * 0.8,
                textAlign: "center",
                color: darkblue,
                fontWeight: "bold",
              },
            ]}
          >
            Sales Accumulated: {parseFloat(total).toFixed(2)}
          </Text>
          {isTable ? (
            <MadeOrdersTableStyle
              filteredOrders={filteredOrders}
              onClick={setSelectedOrder}
            />
          ) : (
            <MadeOrdersListStyle
              filteredOrders={filteredOrders}
              onClick={setSelectedOrder}
            />
          )}
        </View>

        {/* section for order summary */}
        <View style={styles.orderSummary}>
          <OrderReview selectedOrder={selectedOrder} />

          <View style={styles.orderSummaryContent}>
            <ReferenceDT reference={selectedOrder?.reference ?? ""} />
            <Text style={[{ fontSize: span }]}>
              {selectedOrder &&
                formatCurrentDateTime(selectedOrder?.stamp || new Date())}
            </Text>
            <OrderSummaryComponent
              taxAmount={selectedOrder?.fees?.taxAmount ?? 0}
              subTotal={selectedOrder?.fees?.subTotal ?? 0}
              grandTotal={selectedOrder?.fees?.grandTotal ?? 0}
              isDine={selectedOrder?.fees?.diningFee ?? false}
              diningFee={selectedOrder?.fees?.diningFee ?? 0}
            />
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },

  orders: {
    flex: 1,
    backgroundColor: "white",
  },

  date: {
    fontWeight: "bold",
    padding: 10,
  },

  orderSummary: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#002e4d",
  },

  orderSummaryContent: {
    padding: 10,
    borderTopWidth: 2,
    borderColor: "#002e4d",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "700",
  },
});
