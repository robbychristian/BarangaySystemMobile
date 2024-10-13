import { Card, Radio, RadioGroup, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import CustomPaperInput from "../../components/CustomPaperInput";
import { useSelector } from "react-redux";
import CustomDateInput from "../../components/Inputs/CustomDateInput";
import CustomRNDatePicker from "../../components/Inputs/CustomRNDatePicker";
import { Surface } from "react-native-paper";
import FormButtons from "../../components/Buttons/FormButtons";
import { api } from "../../../config/api";
import { Toast } from "toastify-react-native";

const Reservations = () => {
  const { user } = useSelector((state) => state.auth);
  const [userProfile, setUserProfile] = useState("");
  const [documentCode, setDocumentCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedReservation, setSelectedReservation] = useState(0);
  const [barangayEquipment, setBarangayEquipment] = useState("");
  const [dateAndTime, setDateAndTime] = useState(new Date());
  const [purpose, setPurpose] = useState("");

  const submitReservation = () => {
    const requestType =
      selectedReservation == 0
        ? `Barangay Equipment`
        : selectedReservation == 1
        ? "Barangay Vehicle"
        : "Barangay Facilities";
    api
      .post("services/createreservation", {
        user_id: user.id,
        personal_name: user.name,
        personal_birthday: birthDate,
        personal_age: age,
        personal_gender: gender,
        personal_civil_status: civilStatus,
        personal_address: address,
        personal_email: user.email,
        personal_phone: phoneNumber,
        request_type: requestType,
        request_item: barangayEquipment,
        additional_date_time: dateAndTime,
        additional_purpose: purpose,
      })
      .then((response) => {
        console.log(response.data);
        Toast.success("Reservation Submitted!");
      })
      .catch((err) => {
        console.log(err.response);
      });
    console.log(user.id);
    console.log(user.name);
    console.log(birthDate);
    console.log(age);
    console.log(gender);
    console.log(civilStatus);
    console.log(address);
    console.log(user.email);
    console.log(phoneNumber);
    console.log(
      selectedReservation == 0
        ? `Barangay Equipment`
        : selectedReservation == 1
        ? "Barangay Vehicle"
        : "Barangay Facilities"
    );
    console.log(barangayEquipment);
    console.log(dateAndTime);
    console.log(purpose);
  };

  useEffect(() => {
    api
      .get("services/getlatestreservation")
      .then((response) => {
        if (response.data == "") {
          setDocumentCode("RF-001");
        } else {
          setDocumentCode("RF-00" + response.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      })

      api.get(`getuseronlogin?user_id=${user.id}`)
        .then((response) => {
          setUserProfile(response.data)
        })
        .catch(err => {
          console.log(err.response)
        })
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Card>
            <CustomPaperInput
              label={`Document Code`}
              mode={`outlined`}
              value={documentCode}
            />
            <Text category="h5" style={{ color: "#0284C7" }}>
              Personal Information
            </Text>
            <CustomPaperInput
              label={`Name`}
              mode={`outlined`}
              value={user.name}
            />
            <CustomDateInput
              label={`Birthdate`}
              date={birthDate}
              setDate={setBirthDate}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomPaperInput
                value={userProfile.age}
                onChangeText={(value) => setAge(value)}
                label={`Age`}
                mode={"outlined"}
                isHalf
              />
              <CustomPaperInput
                value={userProfile.gender}
                onChangeText={(value) => setGender(value)}
                label={`Gender`}
                mode={"outlined"}
                isHalf
              />
            </View>
            <CustomPaperInput
              value={userProfile.civil_status}
              onChangeText={(value) => setCivilStatus(value)}
              label={`Civil Status`}
              mode={"outlined"}
            />
            <CustomPaperInput
              value={userProfile.address}
              onChangeText={(value) => setAddress(value)}
              label={`Address`}
              mode={"outlined"}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <CustomPaperInput
                value={user.email}
                label={`Email`}
                mode={"outlined"}
                isHalf
              />
              <CustomPaperInput
                value={userProfile.phone_number}
                onChangeText={(value) => setPhoneNumber(value)}
                label={`Phone Number`}
                mode={"outlined"}
                isHalf
              />
            </View>
          </Card>
        </View>
        <View style={{ marginTop: 10 }}>
          <Card>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Reservation/Request
            </Text>
            <RadioGroup
              selectedIndex={selectedReservation}
              onChange={(index) => setSelectedReservation(index)}
            >
              <Radio>Barangay Equipment</Radio>
              <Radio>Barangay Vehicle</Radio>
              <Radio>Barangay Facilities</Radio>
            </RadioGroup>
            <CustomPaperInput
                value={quantity}
                onChangeText={(value) => setQuantity(value)}
                label={`Quantity`}
                mode={"outlined"}
              />
            <CustomPaperInput
              value={barangayEquipment}
              onChangeText={(value) => setBarangayEquipment(value)}
              label={
                selectedReservation == 0
                  ? `Barangay Equipment`
                  : selectedReservation == 1
                  ? "Barangay Vehicle"
                  : "Barangay Facilities"
              }
              mode={`outlined`}
            />
          </Card>
        </View>
        <View style={{ marginTop: 10 }}>
          <Card>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Additional Information
            </Text>
            <CustomRNDatePicker
              label={`Date and Time`}
              value={dateAndTime}
              setValue={setDateAndTime}
            />
            <CustomPaperInput
              value={purpose}
              onChangeText={(value) => setPurpose(value)}
              label={`Purpose`}
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
          text={"SUBMIT RESERVATION"}
          textColor={"#fff"}
          my={4}
          onPress={submitReservation}
        />
      </Surface>
    </View>
  );
};

export default Reservations;
