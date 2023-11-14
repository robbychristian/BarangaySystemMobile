import React from "react";
import { TextInput } from "react-native-paper";

const CustomPaperInput = ({
  label,
  mode,
  value,
  onChangeText,
  isPassword,
  my,
  isHalf,
  disabled,
}) => {
  return (
    <TextInput
      label={label}
      disabled={disabled}
      mode={mode}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={isPassword}
      style={{
        width: isHalf ? "48%" : "100%",
        backgroundColor: "#fff",
        marginVertical: my,
      }}
    />
  );
};

export default CustomPaperInput;
