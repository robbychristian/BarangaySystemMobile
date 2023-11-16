import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import CustomPaperInput from "../components/CustomPaperInput";
import { Button, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { logout, registerUser } from "../store/auth/User";
import { Toast } from "toastify-react-native";
import * as DocumentPicker from "expo-document-picker";
import { api } from "../../config/api";

const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setFile(result);
    Toast.success("File has been uploaded");
  };

  const handleOnRegister = async () => {
    if (name == "" || email == "" || password == "" || confirmPassword == "") {
      Toast.error("Please fill in the form!");
    } else if (password !== confirmPassword) {
      Toast.error("Passwords does not match!");
    } else if (password.length < 8) {
      Toast.error("Passwords should have 8 characters or more!");
    } else {
      const newFile = {
        uri: file.assets[0].uri,
        type: "multipart/form-data",
        name: file.assets[0].name,
      };
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("password_confirmation", confirmPassword);
      formdata.append("submitted_id", newFile);

      // api.post('')
      const response = await dispatch(registerUser(formdata));
      if (response.type == "auth/register/fulfilled") {
        navigation.navigate("Login");
        Toast.success("User has been registered!");
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(2 132 199)",
      }}
    >
      <Loading loading={loading} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
            width: "100%",
          }}
        >
          <Image
            source={require("../../assets/barnagayugong.png")}
            style={{ height: 230, width: 200 }}
          />
          <View style={{ width: "80%" }}>
            <View
              style={{
                border: 1,
                width: "100%",
              }}
            >
              <CustomPaperInput
                onChangeText={(value) => setName(value)}
                value={name}
                label={`Name`}
                my={8}
              />
              <CustomPaperInput
                onChangeText={(value) => setEmail(value)}
                value={email}
                label={`Email`}
                my={8}
              />
              <CustomPaperInput
                onChangeText={(value) => setPassword(value)}
                value={password}
                isPassword
                label={`Password`}
                my={8}
              />
              <CustomPaperInput
                onChangeText={(value) => setConfirmPassword(value)}
                value={confirmPassword}
                isPassword
                label={`Confirm Password`}
                my={8}
              />
              <Button
                style={{ marginVertical: 10 }}
                status="success"
                onPress={pickDocument}
              >
                Upload a File
              </Button>
              <Button
                appearance="outline"
                style={{ backgroundColor: "#fff" }}
                onPress={handleOnRegister}
              >
                <Text category="label" style={{ color: "rgb(2 132 199)" }}>
                  REGISTER
                </Text>
              </Button>
            </View>
            {/* <Button
          appearance="outline"
          style={{ backgroundColor: "#fff" }}
          onPress={async () => {
            await dispatch(logout());
          }}
          >
          <Text category="label" style={{ color: "rgb(2 132 199)" }}>
          LOGOUT
          </Text>
        </Button> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
