import { Card, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import CustomPaperInput from "../../components/CustomPaperInput";
import CustomRNDatePicker from "../../components/Inputs/CustomRNDatePicker";
import { useSelector } from "react-redux";
import { Surface } from "react-native-paper";
import FormButtons from "../../components/Buttons/FormButtons";
import { api } from "../../../config/api";
import { Toast } from "toastify-react-native";

const BlotterReports = () => {
  const { user } = useSelector((state) => state.auth);
  const [incidentType, setIncidentType] = useState("");
  //REPORTING PERSON
  const [dateAndTimeReport, setDateAndTimeReport] = useState(new Date());
  const [reportingAge, setReportingAge] = useState("");
  const [reportingGender, setReportingGender] = useState("");
  const [dateAndTimeIncident, setDateAndTimeIncident] = useState(new Date());
  const [reportingAddress, setReportingAddress] = useState("");
  const [reportingPhoneNumber, setReportingPhoneNumber] = useState("");

  //SUSPECT DATA
  const [suspectName, setSuspectName] = useState("");
  const [suspectRelationToVictim, setSuspectRelationToVictim] = useState("");
  const [suspectAge, setSuspectAge] = useState("");
  const [suspectGender, setSuspectGender] = useState("");
  const [suspectOccupation, setSuspectOccupation] = useState("");
  const [suspectAddress, setSuspectAddress] = useState("");

  //VICTIM DATA
  const [victimName, setVictimName] = useState("");
  const [victimRelationToSuspect, setVictimRelationToSuspect] = useState("");
  const [victimAge, setVictimAge] = useState("");
  const [victimGender, setVictimGender] = useState("");
  const [victimOccupation, setVictimOccupation] = useState("");
  const [victimAddress, setVictimAddress] = useState("");
  const [victimEmail, setVictimEmail] = useState("");
  const [victimPhoneNumber, setVictimPhoneNumber] = useState("");

  //INCIDENT NARRATIVE
  const [placeOfIncident, setPlaceOfIncident] = useState("");
  const [dateAndTimeNarrative, setDateAndTimeNarrative] = useState(new Date());
  const [narrative, setNarrative] = useState("");
  const submitBlotter = () => {
    api
      .post("services/createblotter", {
        incident_type: incidentType,
        user_id: user.id,
        reporting_name: user.name,
        reporting_date: dateAndTimeReport,
        reporting_age: reportingAge,
        reporting_gender: reportingGender,
        reporting_incident_time: dateAndTimeIncident,
        reporting_address: reportingAddress,
        reporting_phone: reportingPhoneNumber,
        suspect_name: suspectName,
        suspect_relation: suspectRelationToVictim,
        suspect_age: suspectAge,
        suspect_gender: suspectGender,
        suspect_occupation: suspectOccupation,
        suspect_address: suspectAddress,
        victim_name: victimName,
        victim_relation: victimRelationToSuspect,
        victim_age: victimAge,
        victim_gender: victimGender,
        victim_occupation: victimOccupation,
        victim_address: victimAddress,
        victim_email: victimEmail,
        victim_phone: victimPhoneNumber,
        narrative_place: placeOfIncident,
        narrative_date: dateAndTimeNarrative,
        narrative: narrative,
      })
      .then((response) => {
        console.log(response.data);
        Toast.success("Blotter has been submitted!");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginHorizontal: 10 }}>
          <CustomPaperInput
            isHalf
            label={`Incident Type`}
            mode="outlined"
            my={15}
            value={incidentType}
            onChangeText={(value) => setIncidentType(value)}
          />
        </View>
        <View>
          <Card disabled>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Reporting Person
            </Text>
            <CustomPaperInput
              label={`Name`}
              mode={"outlined"}
              value={user.name}
            />
            <CustomRNDatePicker
              label={`Date and Time of Report`}
              value={dateAndTimeReport}
              setValue={setDateAndTimeReport}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomPaperInput
                value={reportingAge}
                onChangeText={(value) => setReportingAge(value)}
                label={`Age`}
                mode={"outlined"}
                isHalf
              />
              <CustomPaperInput
                value={reportingGender}
                onChangeText={(value) => setReportingGender(value)}
                label={`Gender`}
                mode={"outlined"}
                isHalf
              />
            </View>
            <CustomRNDatePicker
              label={`Date and Time of Incident`}
              value={dateAndTimeIncident}
              setValue={setDateAndTimeIncident}
            />
            <CustomPaperInput
              value={reportingAddress}
              onChangeText={(value) => setReportingAddress(value)}
              label={`Address`}
              mode={"outlined"}
            />
            <CustomPaperInput
              value={reportingPhoneNumber}
              onChangeText={(value) => setReportingPhoneNumber(value)}
              label={`Phone Number`}
              mode={"outlined"}
            />
          </Card>
        </View>
        <View style={{ marginTop: 10 }}>
          <Card disabled>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Suspect Data
            </Text>
            <CustomPaperInput
              value={suspectName}
              onChangeText={(value) => setSuspectName(value)}
              label={`Name`}
              mode={"outlined"}
            />
            <CustomPaperInput
              value={suspectRelationToVictim}
              onChangeText={(value) => setSuspectRelationToVictim(value)}
              label={`Relation To Victim`}
              mode={"outlined"}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomPaperInput
                value={suspectAge}
                onChangeText={(value) => setSuspectAge(value)}
                label={`Age`}
                mode={"outlined"}
                isHalf
              />
              <CustomPaperInput
                value={suspectGender}
                onChangeText={(value) => setSuspectGender(value)}
                label={`Gender`}
                mode={"outlined"}
                isHalf
              />
            </View>
            <CustomPaperInput
              value={suspectOccupation}
              onChangeText={(value) => setSuspectOccupation(value)}
              label={`Occupation`}
              mode={"outlined"}
            />
            <CustomPaperInput
              value={suspectAddress}
              onChangeText={(value) => setSuspectAddress(value)}
              label={`Address`}
              mode={"outlined"}
            />
          </Card>
        </View>
        <View style={{ marginTop: 10 }}>
          <Card disabled>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Victim Data
            </Text>
            <CustomPaperInput
              value={victimName}
              onChangeText={(value) => setVictimName(value)}
              label={`Name`}
              mode={"outlined"}
            />
            <CustomPaperInput
              value={victimRelationToSuspect}
              onChangeText={(value) => setVictimRelationToSuspect(value)}
              label={`Relation To Victim`}
              mode={"outlined"}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomPaperInput
                value={victimAge}
                onChangeText={(value) => setVictimAge(value)}
                label={`Age`}
                mode={"outlined"}
                isHalf
              />
              <CustomPaperInput
                value={victimGender}
                onChangeText={(value) => setVictimGender(value)}
                label={`Gender`}
                mode={"outlined"}
                isHalf
              />
            </View>
            <CustomPaperInput
              value={victimOccupation}
              onChangeText={(value) => setVictimOccupation(value)}
              label={`Occupation`}
              mode={"outlined"}
            />
            <CustomPaperInput
              value={victimAddress}
              onChangeText={(value) => setVictimAddress(value)}
              label={`Address`}
              mode={"outlined"}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomPaperInput
                label={`Email`}
                value={victimEmail}
                onChangeText={(value) => setVictimEmail(value)}
                mode={"outlined"}
                isHalf
              />
              <CustomPaperInput
                value={victimPhoneNumber}
                onChangeText={(value) => setVictimPhoneNumber(value)}
                label={`Phone Number`}
                mode={"outlined"}
                isHalf
              />
            </View>
          </Card>
        </View>
        <View style={{ marginTop: 10 }}>
          <Card disabled>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Incident Narrative
            </Text>
            <CustomPaperInput
              label={`Place of Incident`}
              value={placeOfIncident}
              onChangeText={(value) => setPlaceOfIncident(value)}
              mode={"outlined"}
            />
            <CustomRNDatePicker
              label={`Date and Time of Report`}
              value={dateAndTimeNarrative}
              setValue={setDateAndTimeNarrative}
            />
            <CustomPaperInput
              label={`Narrative`}
              value={narrative}
              onChangeText={(value) => setNarrative(value)}
              mode={"outlined"}
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
          text={"SUBMIT BLOTTER "}
          textColor={"#fff"}
          my={4}
          onPress={submitBlotter}
        />
      </Surface>
    </View>
  );
};

export default BlotterReports;
