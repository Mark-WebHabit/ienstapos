import {
  Button,
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

import Container from "../components/Container";
import FloatingSidebar from "../components/FloatingSidebar";
import SalesCategoryComponent from "../components/SalesCategoryComponent";
import AddCategoryModal from "../components/AddCategoryModal";
import { DataContext } from "../context/DataContext";
import { get, push, ref, remove, set, update } from "firebase/database";
import { db } from "../firebase";

const Product = ({ navigation }) => {
  const { title, body, darkblue, span, red, green, header } =
    useContext(StyleContext);
  const { products, setShowSidebar, categories, setError, user } =
    useContext(DataContext);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [text, setText] = useState("");
  const [price, setPrice] = useState("");
  const [selectCateg, setSelectCateg] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [searchCateg, setSearchCateg] = useState(""); // Add state for search category

  // products
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [filteredCateg, setFilteredCateg] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

  useEffect(() => {
    if (!user) {
      navigation.navigate("Pin");
    }
  }, [user]);

  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      const newCategs = categories.filter((categ) => categ !== "All");
      setFilteredCateg(newCategs);
    }
  }, [categories]);

  useEffect(() => {
    if (search) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  useEffect(() => {
    if (searchCateg) {
      const filtered = categories.filter((category) =>
        category.toLowerCase().includes(searchCateg.toLowerCase())
      );
      setFilteredCateg(filtered);
    } else {
      setFilteredCateg(categories);
    }
  }, [searchCateg, categories]);

  const handleRemoveProduct = async (id) => {
    const productRef = ref(db, `products/${id}`);
    await remove(productRef);
  };

  const handleSelectCategory = (categ) => {
    const isExisting = selectedCategories.some((c) => c === categ);
    if (!isExisting) {
      setSelectedCategories((prev) => [...prev, categ]);
    }
  };

  const handleRemoveCateg = (categ) => {
    const newCateg = selectedCategories.filter((c) => c !== categ);
    setSelectedCategories(newCateg);
  };

  const handleCancel = () => {
    setSelectedCategories([]);
    setSelectCateg(false);
    setText("");
    setPrice("");
    setEditId(null);
  };

  const handleSelectEditId = (prod) => {
    setEditId(prod.id);
    setText(prod.name);
    setPrice(prod.price);
    setSelectedCategories(prod.categories);
  };

  const handleConfirm = async () => {
    if (!text || !price || !selectedCategories.length) {
      setError("Provide all necessary data");
      return;
    }
    if (isNaN(price)) {
      setError("Invalid Price");
      return;
    }

    try {
      const data = {
        name: text,
        price: parseFloat(price).toFixed(2),
        categories: selectedCategories,
      };

      if (!editId) {
        const productRef = push(ref(db, "products"));
        await set(productRef, data);
      } else {
        const productRef = ref(db, `products/${editId}`);
        await update(productRef, data);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      handleCancel();
    }
  };

  useEffect(() => {
    setSearchCateg("");
  }, [selectCateg]);

  // Add a function to handle saving the category name
  const handleSaveCategory = async (categoryName) => {
    if (!categoryName) {
      setError("Category name cannot be empty");
      return;
    }

    if (typeof categoryName !== "string") {
      setError("Invalid category name");
      return;
    }

    const categoriesRef = ref(db, "categories");
    try {
      const snapshot = await get(categoriesRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const keys = Object.keys(data);

        for (let key of keys) {
          const categ = data[key];

          if (categ.toLowerCase() === categoryName.toLowerCase()) {
            setError("Category Already Exists");
            return;
          }
        }
      }

      // Push the category directly under the UID
      const newCategoryRef = push(categoriesRef);
      await set(newCategoryRef, categoryName);
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const Category = ({ categ }) => (
    <View style={[styles.categoriesContainer, { backColor: darkblue }]}>
      <Text style={[styles.categText, { fontSize: body }]}>{categ}</Text>
      <Pressable style={styles.icon} onPress={() => handleRemoveCateg(categ)}>
        <Image source={require("../assets/erase.png")} />
      </Pressable>
    </View>
  );

  const ProductComponent = ({ product }) => (
    <View style={[styles.product, { backColor: darkblue }]}>
      <Text
        style={[
          styles.productName,
          {
            fontSize: title,
            color: darkblue,
            fontWeight: "bold",
            textAlign: "center",
          },
        ]}
      >
        {product.name}
      </Text>
      <Text
        style={[
          styles.price,
          {
            fontSize: header,
            textAlign: "center",
            fontWeight: "bold",
            color: darkblue,
            marginVertical: 10,
          },
        ]}
      >
        {parseFloat(product.price).toFixed(2)}
      </Text>

      <View style={styles.productOp}>
        <Pressable onPress={() => handleSelectEditId(product)}>
          <Image
            source={require("../assets/bigPen.png")}
            style={styles.productIcon}
          />
        </Pressable>
        <Pressable onPress={() => handleRemoveProduct(product.id)}>
          <Image
            source={require("../assets/bidDel.png")}
            style={styles.productIcon}
          />
        </Pressable>
      </View>
    </View>
  );

  return (
    <Container>
      <FloatingSidebar navigation={navigation} />
      <View style={styles.container}>
        {/* view for add products */}
        <View style={[styles.addProduct, { borderColor: darkblue }]}>
          <Text
            style={{
              fontSize: title,
              fontWeight: "bold",
              color: darkblue,
              textAlign: "center",
              marginVertical: 10,
            }}
          >
            ADD PRODUCT
          </Text>

          <TextInput
            placeholder="Product Name"
            style={[styles.input, { fontSize: body, color: darkblue }]}
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <TextInput
            placeholder="Price"
            style={[styles.input, { fontSize: body, color: darkblue }]}
            value={price}
            onChangeText={(text) => setPrice(text)}
          />

          <Pressable
            style={{
              width: "80%",
              marginHorizontal: "auto",
              backgroundColor: "dodgerblue",
              padding: 10,
              borderRadius: 10,
            }}
            onPress={() => setSelectCateg(!selectCateg)}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: body,
                textAlign: "center",
              }}
            >
              {!selectCateg ? "+ Select Category" : "Hide Categories"}
            </Text>
          </Pressable>

          {!selectedCategories.length ? (
            <Text
              style={[
                {
                  fontSize: body,
                  textAlign: "center",
                  marginTop: 10,
                  color: red,
                },
              ]}
            >
              No Categories Selected*
            </Text>
          ) : (
            <FlatList
              data={selectedCategories}
              renderItem={({ item }) => <Category categ={item} />}
              keyExtractor={(item, i) => i.toString()}
              contentContainerStyle={{ flexGrow: 1, padding: 10 }}
              numColumns={2}
              key={2}
            />
          )}

          <View style={styles.actionButton}>
            <Pressable
              style={[styles.action, { backgroundColor: darkblue }]}
              onPress={() => handleConfirm()}
            >
              <Text
                style={[
                  styles.actionText,
                  {
                    fontSize: body,
                    color: "white",
                    textAlign: "center",
                  },
                ]}
              >
                DONE
              </Text>
            </Pressable>
            <Pressable
              style={[styles.action, { backgroundColor: red }]}
              onPress={handleCancel}
            >
              <Text
                style={[
                  styles.actionText,
                  { fontSize: body, color: "white", textAlign: "center" },
                ]}
              >
                CANCEL
              </Text>
            </Pressable>
          </View>
        </View>

        {/* view for adding product */}
        <View style={styles.productList}>
          {!selectCateg && (
            <View style={[styles.productHeadr, { backColor: darkblue }]}>
              <TextInput
                placeholder="Type a keyword"
                style={[styles.search, { fontSize: title }]}
                value={search}
                onChangeText={(text) => setSearch(text)}
              />
              <Image source={require("../assets/search.png")} />
            </View>
          )}

          {/* render products */}
          {!selectCateg && (
            <View style={styles.renderProducts}>
              {filteredProduct && filteredProduct.length > 0 ? (
                <FlatList
                  data={filteredProduct}
                  renderItem={({ item }) => <ProductComponent product={item} />}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={{ flexGrow: 1 }}
                  numColumns={4}
                  key={4}
                />
              ) : (
                <Text
                  style={{
                    fontSize: header,
                    color: darkblue,
                    textAlign: "center",
                    marginVertical: 20,
                    width: "100%",
                  }}
                >
                  No Products yet
                </Text>
              )}
            </View>
          )}

          {selectCateg && (
            <>
              <View style={styles.categoryContainer}>
                <Button
                  title="Add Category"
                  onPress={() => setIsModalVisible(true)}
                />
                <View style={styles.categorySearch}>
                  <TextInput
                    placeholder="Search Category..."
                    value={searchCateg}
                    onChangeText={(text) => setSearchCateg(text)} // Handle search category text change
                  />
                </View>
              </View>
              <FlatList
                data={filteredCateg}
                renderItem={({ item }) => (
                  <SalesCategoryComponent
                    categ={item}
                    handleSelectCategory={handleSelectCategory}
                    darkblue={darkblue}
                    title={title}
                  />
                )}
                keyExtractor={(item, i) => i.toString()}
                contentContainerStyle={{ flexGrow: 1 }}
                numColumns={4}
                key={4}
              />
            </>
          )}
        </View>

        <Pressable
          style={styles.hamburger}
          onPress={() => setShowSidebar(true)}
        >
          <Image source={require("../assets/hamburger.png")} />
        </Pressable>
      </View>
      <AddCategoryModal
        visible={isModalVisible}
        onSave={handleSaveCategory}
        onCancel={() => setIsModalVisible(false)}
      />
    </Container>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    position: "relative",
  },
  hamburger: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  addProduct: {
    width: "30%",
    height: "100%",
    position: "relative",
    paddingTop: "1%",
    borderRightWidth: 2,
    paddingRight: 20,
  },
  viewBox: {
    width: 100,
    aspectRatio: 1,
    marginHorizontal: "auto",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderBottomWidth: 1,
    width: "80%",
    marginHorizontal: "auto",
    marginVertical: 10,
  },
  buttons: {
    width: "80%",
    marginHorizontal: "auto",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
  },
  categoriesContainer: {
    borderWidth: 1,
    width: "48%",
    padding: 10,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    position: "relative",
  },
  categText: {
    flex: 1,
  },
  actionButton: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  action: {
    paddingVertical: 5,
    width: "40%",
    borderRadius: 10,
  },
  productList: {
    flex: 1,
  },
  productHeadr: {
    flexDirection: "row",
    borderBottomWidth: 2,
    width: "50%",
    alignItems: "center",
    gap: 10,
    marginHorizontal: "auto",
    padding: 10,
  },
  search: {
    flex: 1,
  },
  renderProducts: {
    flex: 1,
    padding: 10,
    flexDirection: "row",
  },
  product: {
    width: "22%",
    aspectRatio: 1,
    borderWidth: 2,
    padding: 20,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  productName: {
    marginBottom: 10,
  },
  productOp: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
  },
  productIcon: {
    resizeMode: "stretch",
    width: 40,
    height: 40,
  },

  categoryContainer: {
    flexDirection: "row",
    padding: 10,
    width: "50%",
    gap: 20,
    alignItems: "center",
  },

  categorySearch: {
    flex: 1,
    borderBottomWidth: 2,
  },
});
