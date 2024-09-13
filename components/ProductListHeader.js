import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

const ProductListHeader = ({
  darkblue,
  setIsTable,
  isTable,
  setSaerch,
  search,
}) => {
  const { setShowSidebar, setRefresh } = useContext(DataContext);
  return (
    <>
      {/* container for oepartions witin product */}
      <View style={styles.productHeader}>
        {/* toggle sidebar */}
        <Pressable onPress={() => setShowSidebar(true)}>
          <Image
            source={require("../assets/hamburger.png")}
            style={styles.icon}
          />
        </Pressable>
        {/* toggle bweteen list type and table type */}
        <Pressable onPress={() => setIsTable(!isTable)}>
          {isTable ? (
            <Image source={require("../assets/list.png")} style={styles.icon} />
          ) : (
            <Image
              source={require("../assets/table.png")}
              style={styles.icon}
            />
          )}
        </Pressable>

        {/* refresh product */}
        <Pressable onPress={() => setRefresh(Math.random() * 100)}>
          <Image
            source={require("../assets/refresh.png")}
            style={styles.icon}
          />
        </Pressable>

        {/* search functionality */}
        <View
          style={[
            styles.search,
            {
              borderBottomWidth: 2,
              borderColor: darkblue,
            },
          ]}
        >
          <TextInput
            placeholder="Search products"
            style={styles.searchInput}
            value={search}
            onChangeText={(text) => setSaerch(text)}
          />
          <Image source={require("../assets/search.png")} style={styles.icon} />
        </View>
      </View>
    </>
  );
};

export default ProductListHeader;

const styles = StyleSheet.create({
  productHeader: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 25,
    borderBottomWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    paddingVertical: 5,
  },

  search: {
    flex: 0.6,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 5,
  },

  searchInput: {
    flex: 1,
  },
});
