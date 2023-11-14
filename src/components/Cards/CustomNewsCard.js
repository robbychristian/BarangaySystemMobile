import { Card, Text } from "@ui-kitten/components";
import React from "react";
import { Image, View } from "react-native";

const CustomNewsCard = ({ title, description }) => {
  return (
    <View style={{ marginTop: 10, width: "100%", alignItems: "center" }}>
      <Card style={{ width: "80%" }}>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/NewsImage.jpg")}
            style={{ width: 200, height: 150 }}
          />
          <Text category="h6" style={{ marginTop: 10 }}>
            {title}
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              width: "100%",
              marginVertical: 10,
            }}
          ></View>
          <Text category="label" style={{ fontWeight: "400" }}>
            {description}
          </Text>
        </View>
      </Card>
    </View>
  );
};

export default CustomNewsCard;
