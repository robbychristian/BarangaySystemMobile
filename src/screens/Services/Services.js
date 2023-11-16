import React, { useEffect } from "react";
import { View, ScrollView } from "react-native";
import CustomClickableCard from "../../components/Cards/CustomClickableCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const Services = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    console.log(user);
  }, []);
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
            icon={"folder"}
            onPress={() => {
              navigation.navigate("DocumentSubmission");
            }}
            text={`DOCUMENT SUBMISSION`}
          />
          <CustomClickableCard
            icon={"file"}
            onPress={() => {
              navigation.navigate("BlotterReport");
            }}
            text={`BLOTTER REPORTS`}
          />
          <CustomClickableCard
            icon={"clock-outline"}
            onPress={() => {
              navigation.navigate("Reservations");
            }}
            text={`RESERVATIONS`}
          />
          <CustomClickableCard
            icon={"calendar-month"}
            onPress={() => {
              navigation.navigate("Clinic");
            }}
            text={`CLINIC`}
          />
          <CustomClickableCard
            icon={"receipt"}
            onPress={() => {
              navigation.navigate("Transactions");
            }}
            text={`TRANSACTION`}
          />
          {/* <CustomClickableCard
            icon={"calendar-today"}
            onPress={() => {
              console.log("test");
            }}
            text={`APPOINTMENT`}
          /> */}
          <CustomClickableCard hidden={true} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Services;
