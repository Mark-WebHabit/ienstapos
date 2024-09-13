import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import TotalComponent from "./TotalComponent";
import { StyleContext } from "../context/StyleContextProvider";
import { DataContext } from "../context/DataContext";

const OrderSummaryComponent = ({
  taxAmount,
  subTotal,
  grandTotal,
  isDine,
  diningFee,
}) => {
  const { title, span, body, header, darkblue, red } = useContext(StyleContext);

  return (
    <>
      <TotalComponent
        size={title}
        darkblue={darkblue}
        red={red}
        body={body}
        label={"Sub Total"}
        value={subTotal}
      />
      <TotalComponent
        size={title}
        darkblue={darkblue}
        red={red}
        body={body}
        label={"Tax"}
        value={taxAmount}
      />
      <TotalComponent
        size={title}
        darkblue={darkblue}
        red={red}
        body={body}
        label={"Dining Fee"}
        value={isDine ? diningFee : 0}
      />
      <TotalComponent
        size={header}
        darkblue={darkblue}
        red={red}
        body={body}
        label={"Grand Total"}
        value={grandTotal}
      />
    </>
  );
};

export default OrderSummaryComponent;

const styles = StyleSheet.create({});
