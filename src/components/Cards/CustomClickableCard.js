import { Text } from "@ui-kitten/components";
import React from "react";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CustomClickableCard = ({ text, onPress, icon, hidden }) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: hidden ? "transparent" : "#0284C7",
        marginVertical: 10,
        width: 160,
        paddingVertical: 25,
        alignItems: "center",
      }}
      onPress={onPress}
    >
      <Icon name={icon} size={75} color={"#fff"} />
      <Text category="label" style={{ color: "#fff" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomClickableCard;
