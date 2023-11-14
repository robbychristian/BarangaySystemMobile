import { Button, Card, Radio, RadioGroup, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import CustomPaperInput from "../../components/CustomPaperInput";
import { useDispatch, useSelector } from "react-redux";
import CustomDateInput from "../../components/Inputs/CustomDateInput";
import * as DocumentPicker from "expo-document-picker";
import { Toast } from "toastify-react-native";
import { Surface } from "react-native-paper";
import FormButtons from "../../components/Buttons/FormButtons";
import { api } from "../../../config/api";
import moment from "moment";

const DocumentSubmission = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(0);
  const [natureOfBusiness, setNatureOfBusiness] = useState("");
  const [purposeOfDocument, setPurposeOfDocument] = useState("");
  const [file, setFile] = useState(null);
  useEffect(() => {
    console.log(user);
    console.log(token);
  }, []);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setFile(result);
    Toast.success("File has been uploaded");
  };

  const submitDocument = async () => {
    if (
      age == "" ||
      gender == "" ||
      civilStatus == "" ||
      address == "" ||
      phoneNumber == "" ||
      selectedDocument == "" ||
      natureOfBusiness == "" ||
      purposeOfDocument == "" ||
      file == null
    ) {
      Toast.error("Please complete the form!");
    } else {
      const newFile = {
        uri: file.assets[0].uri,
        type: "multipart/form-data",
        name: file.assets[0].name,
      };
      let docType = "";
      if (selectedDocument == 0) {
        docType = "Barangay Clearance";
      } else if (selectedDocument == 1) {
        docType = "Cedula";
      } else if (selectedDocument == 2) {
        docType = "Barangay Certificate";
      } else if (selectedDocument == 3) {
        docType = "Business Clearance";
      }
      const formdata = new FormData();
      formdata.append("user_id", user.id);
      formdata.append("name", user.name);
      formdata.append("age", age);
      formdata.append("gender", gender);
      formdata.append("birth_date", moment(date).format("YYYY-MM-DD"));
      formdata.append("civil_status", civilStatus);
      formdata.append("address", address);
      formdata.append("email", user.email);
      formdata.append("phone_number", phoneNumber);
      formdata.append("document_type", docType);
      formdata.append("nature_of_business", natureOfBusiness);
      formdata.append("purpose_of_document", purposeOfDocument);
      formdata.append("file", newFile);
      try {
        const response = await api.post("services/createdocument", formdata);
        Toast.success("Document has been submitted!");
        // setDate(new Date());
        // setAge("");
        // setGender("");
        // setCivilStatus("");
        // setAddress("");
        // setPhoneNumber("");
        // setSelectedDocument(0);
        // setNatureOfBusiness("");
        // setPurposeOfDocument("");
        // setFile(null);
      } catch (err) {
        Toast.error("There was a problem submitting the form.");
        console.log(err);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          <Card>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Personal Information
            </Text>
            <CustomPaperInput
              label={`Name`}
              mode={"outlined"}
              value={user.name}
            />
            <CustomDateInput
              label={`Birthdate`}
              date={date}
              setDate={setDate}
            />
            <CustomPaperInput
              label={`Age`}
              mode={"outlined"}
              value={age}
              onChangeText={(value) => setAge(value)}
            />
            <CustomPaperInput
              label={`Gender`}
              mode={"outlined"}
              value={gender}
              onChangeText={(value) => setGender(value)}
            />
            <CustomPaperInput
              label={`Civil Status`}
              mode={"outlined"}
              value={civilStatus}
              onChangeText={(value) => setCivilStatus(value)}
            />
            <CustomPaperInput
              label={`Address`}
              mode={"outlined"}
              value={address}
              onChangeText={(value) => setAddress(value)}
            />
            <CustomPaperInput
              label={`Email`}
              mode={"outlined"}
              value={user.email}
            />
            <CustomPaperInput
              label={`Phone Number`}
              mode={"outlined"}
              value={phoneNumber}
              onChangeText={(value) => setPhoneNumber(value)}
            />
          </Card>
        </View>
        <View style={{ marginTop: 10 }}>
          <Card>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Document Type
            </Text>
            <RadioGroup
              selectedIndex={selectedDocument}
              onChange={(index) => setSelectedDocument(index)}
            >
              <Radio>Barangay Clearance</Radio>
              <Radio>Cedula</Radio>
              <Radio>Barangay Certificate</Radio>
              <Radio>Business Clearance</Radio>
            </RadioGroup>
          </Card>
        </View>
        <View style={{ marginTop: 10 }}>
          <Card>
            <Text category="h5" style={{ color: "#0284C7" }}>
              Additional Information
            </Text>
            <CustomPaperInput
              mode={`outlined`}
              label={`Nature of Business`}
              value={natureOfBusiness}
              onChangeText={(value) => setNatureOfBusiness(value)}
            />
            <CustomPaperInput
              mode={`outlined`}
              label={`Purpose of Document`}
              value={purposeOfDocument}
              onChangeText={(value) => setPurposeOfDocument(value)}
            />
            <Button style={{ marginTop: 10 }} onPress={pickDocument}>
              Upload a File
            </Button>
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
          text={"SUBMIT DOCUMENT"}
          textColor={"#fff"}
          my={4}
          onPress={submitDocument}
        />
      </Surface>
    </View>
  );
};

export default DocumentSubmission;
