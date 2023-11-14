import React from "react";
import { View, ScrollView } from "react-native";
import CustomClickableCard from "../../components/Cards/CustomClickableCard";
import { useNavigation } from "@react-navigation/native";

const Announcement = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <CustomClickableCard
            icon={"newspaper"}
            onPress={() => {
              navigation.navigate("BarangayNews");
            }}
            text={`BARANGAY NEWS`}
          />
          <CustomClickableCard
            icon={"calendar"}
            onPress={() => {
              console.log("test");
            }}
            text={`UPCOMING EVENTS`}
          />
          <CustomClickableCard
            icon={"calendar-refresh"}
            onPress={() => {
              console.log("test");
            }}
            text={`PAST EVENTS`}
          />
          <CustomClickableCard hidden={true}></CustomClickableCard>
        </View>
      </ScrollView>
    </View>
  );
};

export default Announcement;
