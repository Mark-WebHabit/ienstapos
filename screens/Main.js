import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { StyleContext } from "../context/StyleContextProvider";

import Container from "../components/Container";
import ProductListHeader from "../components/ProductListHeader";
import CategoryComponent from "../components/CategoryComponent";
import ProductTableStyle from "../components/ProductTableStyle";
import ProductListStyle from "../components/ProductListStyle";
import TotalComponent from "../components/TotalComponent";
import CashierOrder from "../components/CashierOrder";
import OrderSummaryComponent from "../components/OrderSummaryComponent";
import FloatingSidebar from "../components/FloatingSidebar";
import ConfirmModal from "../components/ConfirmModal";

import ReferenceDT from "../components/ReferenceD&T";
import { Picker } from "@react-native-picker/picker";
import { generatePOSCode } from "../utilities/reference";
import { formatCurrentDateTime } from "../utilities/date";
import { DataContext } from "../context/DataContext";
import { calculateSubtotal } from "../utilities/computation";
import { onChildAdded, push, ref, set } from "firebase/database";
import { db } from "../firebase";

const Main = ({ navigation }) => {
  const { darkblue, title, body } = useContext(StyleContext);
  const { user, products, DINING_FEE, TAX, madeOrders, setError, setLoading } =
    useContext(DataContext);

  // states
  const [search, setSaerch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [selectedCateg, setSelectedCateg] = useState("All");

  const [mop, setMop] = useState("Cash");
  const [modalVisible, setModalVisible] = useState(false);
  const [isTable, setIsTable] = useState(true);

  // decisions
  const [isDine, setIsDine] = useState(true);

  // state for order
  const [orders, setOrders] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [isPriority, setIsPriority] = useState(false);
  const [reference, setReference] = useState(generatePOSCode());
  const [orderNumber, setOrderNumber] = useState(1);

  useEffect(() => {
    setOrderNumber(madeOrders.length + 1);
  }, [madeOrders]);

  useEffect(() => {
    const total = calculateSubtotal(orders);

    setSubTotal(total);
  }, [orders]);

  useEffect(() => {
    const total = subTotal * TAX;

    setTaxAmount(total);
  }, [subTotal]);

  useEffect(() => {
    if (isDine) {
      const total = DINING_FEE + subTotal + taxAmount;
      setGrandTotal(total);
    } else {
      const total = subTotal + taxAmount;
      setGrandTotal(total);
    }
  }, [subTotal, isDine, taxAmount]);

  // uac implementaion
  useEffect(() => {
    if (!user) {
      navigation.navigate("Pin");
    }
  }, [user]);

  //  handle search
  useEffect(() => {
    if (!products?.length) {
      // Products array is empty, no need to filter
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((prod) => {
      const matchesSearch =
        prod.name?.toLowerCase()?.includes(search.toLowerCase()) ||
        prod.price?.toString()?.includes(search.toLowerCase());
      const matchesCategory =
        selectedCateg === "All" || prod?.categories?.includes(selectedCateg);
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [search, selectedCateg, products]);

  const handleIncrementDecrement = (action, id) => {
    if (action == "increment") {
      const newOrder = orders.map((order) => {
        if (order.id == id) {
          order.quantity += 1;
        }

        return order;
      });

      setOrders(newOrder);
    } else if (action == "decrement") {
      const newOrder = orders.map((order) => {
        if (order.id == id) {
          if (order.quantity > 1) {
            order.quantity -= 1;
          }
        }

        return order;
      });

      setOrders(newOrder);
    } else if (action == "remove") {
      const newOrders = orders.filter((order) => order.id !== id);

      setOrders(newOrders);
    } else if (action == "delete") {
      setOrders([]);
    }
  };

  const handleConfirmAddOrder = async (paid = false) => {
    if (orders.length < 1) {
      setError("Please select a product");
      return;
    }
    setModalVisible(false);
    setLoading(true);

    try {
      const stamp = new Date().toISOString();
      const diningFee = isDine ? DINING_FEE : 0;

      const data = {
        reference: reference ?? "",
        fees: {
          subTotal: subTotal ?? 0,
          grandTotal: grandTotal ?? 0,
          taxAmount: taxAmount ?? 0,
          diningFee,
        },
        stamp,
        priority: isPriority ?? false,
        orderNumber: orderNumber ?? 0,
        orders: orders,
        status: "pending",
      };

      const ordersRef = push(ref(db, "orders"));
      await set(ordersRef, data);

      setReference(generatePOSCode());
      setSubTotal(0);
      setGrandTotal(0);
      setTaxAmount(0);
      setIsPriority(false);
      setIsDine(true);
      setOrders([]);
    } catch (error) {
      setError(error.message);
      console.log("Error adding order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAddOrder = () => {
    setModalVisible(false);
  };

  const handleConfirmOrder = () => {
    setModalVisible(true);
  };

  const handleAddOrder = (product) => {
    if (!product) {
      return;
    }

    const isExisting = orders.find(
      (order) => order.name == product.name && order.price == product.price
    );

    if (isExisting?.name) {
      const newOrder = orders.map((order) => {
        if (order.id === isExisting.id) {
          order.quantity += 1;
        }

        return order;
      });

      setOrders(newOrder);
    } else {
      const id = new Date().toISOString() + (Math.random() * 100).toString();
      let obj = { ...product, id, quantity: 1 };

      setOrders((prev) => [...prev, obj]);
    }
  };

  return (
    <Container>
      <FloatingSidebar navigation={navigation} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <View style={styles.container}>
          {/* container for products and categories */}
          <View style={styles.leftSection}>
            {/* container for products */}
            <View style={styles.productList}>
              <ProductListHeader
                darkblue={darkblue}
                setIsTable={setIsTable}
                isTable={isTable}
                search={search}
                setSaerch={setSaerch}
              />
              {/* list of products ================*/}
              {isTable ? (
                <ProductTableStyle
                  products={filteredProducts || []}
                  handleAddOrder={handleAddOrder}
                />
              ) : (
                <ProductListStyle
                  products={filteredProducts || []}
                  handleAddOrder={handleAddOrder}
                />
              )}
            </View>

            {/* category list ============================= */}
            <CategoryComponent setSelectedCateg={setSelectedCateg} />
          </View>

          {/* sectiom for receipt */}
          <View style={styles.rightSection}>
            <View style={styles.rightSectionHeader}>
              {/* buttons */}
              <Pressable>
                <Image source={require("../assets/lock.png")} />
              </Pressable>
              <Pressable onPress={() => handleIncrementDecrement("delete")}>
                <Image source={require("../assets/trash-can.png")} />
              </Pressable>

              {/* mop */}
              <View style={styles.mopContainer}>
                <Picker
                  selectedValue={mop}
                  onValueChange={(itemValue, itemIndex) => setMop(itemValue)}
                >
                  <Picker.Item label="CASH (on hand)" value={"Cash"} />
                </Picker>
              </View>

              <Button
                title={!isDine ? "Dine in" : "Take out"}
                onPress={() => setIsDine(!isDine)}
              />
            </View>

            {/* order container */}
            <View style={styles.orderContainer}>
              {/* orders from casheir will go here */}
              <CashierOrder
                orders={orders}
                handleIncrementDecrement={handleIncrementDecrement}
              />
              {/* total s */}
              <View
                style={[{ padding: 10, borderWidth: 1, borderBottomWidth: 0 }]}
              >
                <View style={styles.orderHeader}>
                  <Button
                    onPress={() => setIsPriority(!isPriority)}
                    title={isPriority ? "Unmark Priority" : "Mark as Priority"}
                  />

                  <Text style={{ fontSize: body }}>
                    Order Number: {orderNumber}
                  </Text>
                </View>

                <OrderSummaryComponent
                  orders={orders}
                  taxAmount={taxAmount}
                  subTotal={subTotal}
                  grandTotal={grandTotal}
                  isDine={isDine}
                  diningFee={DINING_FEE}
                />
                <ReferenceDT reference={reference} />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: darkblue }]}
                onPress={handleConfirmOrder}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: "white", fontSize: title },
                  ]}
                >
                  Add Order
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={[styles.button, { backgroundColor: darkblue }]}
                onPress={() => handleConfirmOrder(true)}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: "white", fontSize: title },
                  ]}
                >
                  Payment
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ConfirmModal
        visible={modalVisible}
        onConfirm={handleConfirmAddOrder}
        onCancel={handleCancelAddOrder}
        message="Are you sure you want to add this order?"
      />
    </Container>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  leftSection: {
    flex: 0.6,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  productList: {
    flex: 0.67,
    marginLeft: 10,
  },

  products: {
    justifyContent: "space-evenly",
    padding: 10,
  },

  rightSection: {
    flex: 0.4,
  },

  rightSectionHeader: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderBottomWidth: 2,
    borderColor: "rgba(0,0,0,0.3)",
  },

  mopContainer: {
    height: 35,
    justifyContent: "center",
    width: "60%",
    borderBottomWidth: 2,
  },

  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },

  orderContainer: {
    flex: 1,
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
