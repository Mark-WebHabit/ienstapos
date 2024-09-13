import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ref, get, remove, set } from "firebase/database";
import { db } from "../firebase";

const SalesCategoryComponent = ({
  darkblue,
  categ,
  handleSelectCategory,
  title,
}) => {
  const [value, setValue] = useState(categ);
  const [originalValue, setOriginalValue] = useState(categ);
  const [edit, setEdit] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  const handleDelete = async () => {
    const categRef = ref(db, "categories");
    const snapshot = await get(categRef);

    if (snapshot.exists()) {
      const categories = snapshot.val();
      const keyToDelete = Object.keys(categories).find(
        (key) => categories[key] === originalValue
      );

      if (keyToDelete) {
        const deleteRef = ref(db, `categories/${keyToDelete}`);
        await remove(deleteRef);
      }
    }
  };

  const handleSave = async () => {
    if (edit) {
      if (value == "") {
        return;
      }
      const categRef = ref(db, "categories");
      const snapshot = await get(categRef);

      if (snapshot.exists()) {
        const categories = snapshot.val();
        const keyToUpdate = Object.keys(categories).find(
          (key) => categories[key] === originalValue
        );

        if (keyToUpdate) {
          const updateRef = ref(db, `categories/${keyToUpdate}`);
          await set(updateRef, value); // Set the entire document with the updated value
          setEdit(false);
          setOriginalValue(value); // Update original value after saving changes
        }
      }
    }
  };
  return (
    <Pressable
      style={[styles.categoryComponent, { borderColor: darkblue }]}
      onPress={() => handleSelectCategory(categ)}
    >
      <Pressable style={styles.trash} onPress={handleDelete}>
        <Image source={require("../assets/trash-can.png")} />
      </Pressable>
      <TextInput
        style={[
          styles.categorytext,
          { fontSize: title, color: darkblue, fontWeight: "700" },
        ]}
        value={value}
        editable={edit}
        ref={inputRef}
        onChangeText={(text) => setValue(text)}
      />

      <TouchableOpacity
        style={styles.editContainer}
        onPress={() => (edit ? handleSave() : setEdit(true))}
      >
        <Text style={styles.edit}>{edit ? "SAVE" : "EDIT"}</Text>
      </TouchableOpacity>
    </Pressable>
  );
};

export default SalesCategoryComponent;

const styles = StyleSheet.create({
  categoryComponent: {
    width: "18%",
    aspectRatio: 1,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 15,
    position: "relative",
    overflow: "hidden",
  },
  trash: {
    position: "absolute",
    top: 10,
    right: 10,
  },

  editContainer: {
    borderWidth: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 5,
    backgroundColor: "#002e4d",
  },

  edit: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});
