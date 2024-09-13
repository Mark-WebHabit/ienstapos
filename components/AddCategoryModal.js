import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";

const AddCategoryModal = ({ visible, onSave, onCancel }) => {
  const [categoryName, setCategoryName] = useState("");

  const handleSave = () => {
    onSave(categoryName);
    setCategoryName("");
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={categoryName}
            onChangeText={setCategoryName}
          />
          <Pressable
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.textStyle}>Save</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalView: {
    margin: 20,
    width: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: 100,
  },
  saveButton: {
    backgroundColor: "dodgerblue",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    width: "100%",
    padding: 10,
  },
});

export default AddCategoryModal;
