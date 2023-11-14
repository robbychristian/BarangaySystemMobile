import React, { useState } from "react";
import { View } from "react-native";
import CustomPaperInput from "../components/CustomPaperInput";
import { Button, Text } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { logout, registerUser } from "../store/auth/User";
import { Toast } from "toastify-react-native";

const Register = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnRegister = async () => {
    if (name == "" || email == "" || password == "" || confirmPassword == "") {
      Toast.error("Please fill in the form!");
    } else if (password !== confirmPassword) {
      Toast.error("Passwords does not match!");
    } else if (password.length < 8) {
      Toast.error("Passwords should have 8 characters or more!");
    } else {
      const inputs = {
        name,
        email,
        password,
        confirmPassword,
      };

      const response = await dispatch(registerUser(inputs));
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Loading loading={loading} />
      <View
        style={{
          border: 1,
          backgroundColor: "rgb(2 132 199)",
          paddingVertical: 20,
          paddingHorizontal: 10,
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
          appearance="outline"
          style={{ backgroundColor: "#fff" }}
          onPress={handleOnRegister}
        >
          <Text category="label" style={{ color: "rgb(2 132 199)" }}>
            REGISTER
          </Text>
        </Button>
        <Button
          appearance="outline"
          style={{ backgroundColor: "#fff" }}
          onPress={async () => {
            await dispatch(logout());
          }}
        >
          <Text category="label" style={{ color: "rgb(2 132 199)" }}>
            LOGOUT
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Register;
