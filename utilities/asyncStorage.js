import AsyncStorage from "@react-native-async-storage/async-storage";

// Function to store data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.error("Failed to save data to AsyncStorage", e);
  }
};

// Function to retrieve data
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.error("Failed to fetch data from AsyncStorage", e);
  }
};

// Function to remove data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // remove error
    console.error("Failed to remove data from AsyncStorage", e);
  }
};
