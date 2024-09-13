import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
} from "react-native";
import React, { useContext, useState } from "react";
import { DataContext } from "../context/DataContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { StyleContext } from "../context/StyleContextProvider";

const OrdersHeader = ({
  isTable,
  setIsTable,
  sales = false,
  search,
  setSearch,
  filter,
  setFilter,
  hasCalendar = false,
}) => {
  const { setShowSidebar, date, setDate } = useContext(DataContext);
  const { darkblue, lightblue } = useContext(StyleContext);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    if (!hasCalendar) {
      return;
    }

    const currentDate = selectedDate || date;
    setShow(false);

    setDate(currentDate);
  };

  return (
    <View style={[styles.container]}>
      <Pressable onPress={() => setShowSidebar(true)}>
        <Image source={require("../assets/hamburger.png")} />
      </Pressable>
      {hasCalendar && (
        <Pressable onPress={() => setShow(true)}>
          <Image source={require("../assets/calendar.png")} />
        </Pressable>
      )}
      <Pressable onPress={() => setIsTable(!isTable)}>
        {isTable ? (
          <Image source={require("../assets/table.png")} />
        ) : (
          <Image source={require("../assets/list.png")} />
        )}
      </Pressable>
      <View style={styles.searchContainer}>
        <Image source={require("../assets/search.png")} />
        <TextInput
          placeholder="Search reference number"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      {!sales && (
        <View style={[styles.category, { borderColor: darkblue }]}>
          <Picker
            selectedValue={filter}
            onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
          >
            <Picker.Item label="ALL" value={""} />
            <Picker.Item label="Priority" value={"Priority"} />
          </Picker>
        </View>
      )}

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default OrdersHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "8%",
    alignItems: "center",
    paddingLeft: 10,
    gap: 20,
  },

  searchContainer: {
    width: "45%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    paddingBottom: 5,
    borderColor: "#002e4d",
  },

  category: {
    flex: 1,
    height: 34,
    marginRight: 10,
    justifyContent: "center",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
});
