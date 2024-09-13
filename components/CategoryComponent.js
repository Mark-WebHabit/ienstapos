import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { StyleContext } from "../context/StyleContextProvider";
import { DataContext } from "../context/DataContext";

const CategoryComponent = ({ setSelectedCateg }) => {
  const { darkblue, body, red, yellow, span, gray } = useContext(StyleContext);
  const { categories } = useContext(DataContext);
  const [filteredCateg, setFilteredCateg] = useState(categories || []);
  const [search, setSearch] = useState("");
  const [isAscending, setIsAscending] = useState(true);

  const colors = [darkblue, red, yellow, gray];

  // Handle filtering and sorting
  useEffect(() => {
    if (categories.length < 1) {
      return;
    }

    const filtered = categories.filter((categ) =>
      categ.toLowerCase().includes(search.toLowerCase())
    );

    const sortedCategories = [...filtered].sort((a, b) => {
      if (!isAscending) {
        return b.localeCompare(a);
      }
    });

    setFilteredCateg(sortedCategories);
  }, [search, categories, isAscending]);

  const toggleSortOrder = () => {
    setIsAscending(!isAscending);
  };

  const Category = ({ categ, index }) => (
    <Pressable
      style={[
        styles.categoryWrapper,
        { backgroundColor: colors[index % colors.length] },
      ]}
      onPress={() => setSelectedCateg(categ)}
    >
      <Text
        style={[
          styles.categ,
          {
            fontSize: span,
            color: "white",
            fontWeight: "600",
            textTransform: "uppercase",
          },
        ]}
      >
        {categ || "All"}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* search and sort */}
      <View style={styles.categoryHeader}>
        <View style={[styles.search, { borderColor: darkblue }]}>
          <Image source={require("../assets/search.png")} style={styles.icon} />
          <TextInput
            placeholder="Search Category"
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <Pressable onPress={toggleSortOrder}>
          <Image source={require("../assets/sort.png")} style={styles.icon} />
        </Pressable>
      </View>

      {/* render categories */}
      <View style={styles.category}>
        <FlatList
          data={filteredCateg}
          renderItem={({ item, index }) => (
            <Category categ={item} index={index} />
          )}
          keyExtractor={(item, i) => i.toString()}
          numColumns={2}
          key={2} // Add this line to force re-render when numColumns changes
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </View>
    </View>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    borderColor: "rgba(0,0,0,0.2)",
    borderRightWidth: 2,
  },

  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 5,
    height: "8%",
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderBottomWidth: 2,
    paddingBottom: 5,
  },

  icon: {
    width: 16,
    height: 16,
  },

  category: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  categoryWrapper: {
    width: "43%",
    minWidth: 100,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
});
