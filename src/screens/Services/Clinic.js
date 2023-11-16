import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import CustomPaperInput from "../../components/CustomPaperInput";
import { Card, Text } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import CustomRNDatePicker from "../../components/Inputs/CustomRNDatePicker";
import { Surface } from "react-native-paper";
import FormButtons from "../../components/Buttons/FormButtons";
import { api } from "../../../config/api";
import { Toast } from "toastify-react-native";
import Loading from "../../components/Loading";
import moment from "moment";

const Clinic = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [dateTimeSchedule, setDateTimeSchedule] = useState(new Date());
  const submitSchedule = () => {
    setLoading(true);
    api
      .post("services/scheduleclinic", {
        user_id: user.id,
        schedule: moment(dateTimeSchedule).format("YYYY-MM-DD hh:mm:ss.SSS"),
      })
      .then((response) => {
        setLoading(false);
        Toast.success("Scheduled a clinic appointment!");
        navigation.goBack();
        console.log(response.data);
      })
      .catch((err) => {
        setLoading(false);
        Toast.error("There was a problem handling your request!");
        console.log(err);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Loading loading={loading} />
        <View>
          <Card disabled>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Clinic Scheduling
            </Text>
            <CustomPaperInput
              label={`Name`}
              mode={"outlined"}
              value={user.name}
            />
            <CustomRNDatePicker
              label={`Date and Time of Report`}
              value={dateTimeSchedule}
              setValue={setDateTimeSchedule}
            />
          </Card>
        </View>
      </ScrollView>
      <Surface
        style={{
          paddingVertical: 20,
          paddingHorizontal: 15,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
        elevation={1}
      >
        <FormButtons
          buttonColor={"#0284C7"}
          text={"SUBMIT SCHEDULE"}
          textColor={"#fff"}
          my={4}
          onPress={submitSchedule}
        />
      </Surface>
    </View>
  );
};

export default Clinic;
