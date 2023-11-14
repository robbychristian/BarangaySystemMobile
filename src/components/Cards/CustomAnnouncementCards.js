import { Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

const CustomAnnouncementCards = ({ title, description }) => {
  return (
    <View>
      <Text category="h4" style={{ fontWeight: "700" }}>
        {title}
      </Text>
      <Text category="h6" style={{ fontWeight: "400" }}>
        {description}
      </Text>
    </View>
  );
};

export default CustomAnnouncementCards;
