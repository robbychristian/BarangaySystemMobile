import RNDateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomPaperInput from "../CustomPaperInput";
import moment from "moment";

const CustomRNDatePicker = ({ label, value, setValue }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  return (
    <>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <CustomPaperInput
          label={label}
          value={value}
          mode={`outlined`}
          disabled={true}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <RNDateTimePicker
          mode="date"
          value={new Date()}
          style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
          onChange={(e, date) => {
            if (e.type === "set") {
              setDate(moment(date).format("YYYY-MM-DD"));
              setShowDatePicker(false);
              setShowTimePicker(true);
            } else {
              setShowDatePicker(false);
            }
          }}
        />
      )}
      {showTimePicker && (
        <RNDateTimePicker
          mode="time"
          value={new Date()}
          style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
          onChange={(e, date) => {
            if (e.type === "set") {
              setTime(moment(date).format("hh:mm A"));
              setValue(
                `${selectedDate} ${moment(date).format("hh:mm:ss.SSS")}`
              );
              setShowTimePicker(false);
            } else {
              setShowDatePicker(false);
            }
          }}
        />
      )}
    </>
  );
};

export default CustomRNDatePicker;
