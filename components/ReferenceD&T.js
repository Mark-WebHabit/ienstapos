import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import { generatePOSCode } from "../utilities/reference";
import { formatCurrentDateTime } from "../utilities/date";
import { StyleContext } from "../context/StyleContextProvider";

const ReferenceDT = ({ reference }) => {
  const { span, darkblue } = useContext(StyleContext);
  return (
    <View style={styles.spanInfo}>
      <Text style={[styles.smallDetails, { fontSize: span, color: darkblue }]}>
        Ref: {reference}
      </Text>
      {/* <Text style={[styles.smallDetails, { fontSize: span, color: darkblue }]}>
        D&T: {formatCurrentDateTime()}
      </Text> */}
    </View>
  );
};

export default ReferenceDT;

const styles = StyleSheet.create({
  spanInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
