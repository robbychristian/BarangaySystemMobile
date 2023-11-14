import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View } from "react-native";
import CustomClickableCard from "../../components/Cards/CustomClickableCard";

const Records = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flexGrow: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <CustomClickableCard
            icon={"bank"}
            onPress={() => {
              console.log("test");
            }}
            text={`BARANGAY RECORDS`}
          />
          <CustomClickableCard
            icon={"home"}
            onPress={() => {
              console.log("test");
            }}
            text={`RESIDENT RECORDS`}
          />
          <CustomClickableCard
            icon={"text-box"}
            onPress={() => {
              console.log("test");
            }}
            text={`INCIDENT REPORTS`}
          />
          <CustomClickableCard
            icon={"email-open"}
            onPress={() => {
              console.log("test");
            }}
            text={`TRANSACTION RECORDS`}
          />
          <CustomClickableCard hidden={true}></CustomClickableCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default Records;
