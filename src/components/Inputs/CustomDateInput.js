import { Datepicker } from "@ui-kitten/components";
import moment from "moment";
import React from "react";
import { View } from "react-native";
const CustomDateInput = ({ label, date, setDate, my }) => {
  return (
    <Datepicker
      label={label}
      date={date}
      min={new Date("1900-01-01")}
      style={{ width: "100%", backgroundColor: "#fff", marginVertical: my }}
      onSelect={(nextDate) => setDate(nextDate)}
    />
  );
};

export default CustomDateInput;
