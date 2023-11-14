import { Button, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import CustomPaperInput from "../components/CustomPaperInput";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import { loginUser } from "../store/auth/User";
import { Toast } from "toastify-react-native";
import * as Device from "expo-device";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnLogin = async () => {
    const inputs = {
      email,
      password,
      device_name: Device.deviceName,
    };
    const response = await dispatch(loginUser(inputs));
    if (response.payload.error === "Credentials does not exist!") {
      Toast.error("Credentials does not exist!");
    } else {
      console.log(response.payload);
      Toast.success("Logged In!");
      navigation.navigate("DrawerStack", {
        screen: "Home",
      });
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loading loading={loading} />
      <View style={{ width: "80%" }}>
        <CustomPaperInput
          label={`Email`}
          mode={"outlined"}
          value={email}
          onChangeText={(value) => setEmail(value)}
        />
        <CustomPaperInput
          label={`Password`}
          mode={"outlined"}
          isPassword
          value={password}
          onChangeText={(value) => setPassword(value)}
        />
        <Button
          appearance="filled"
          style={{ marginTop: 15 }}
          onPress={handleOnLogin}
        >
          LOGIN
        </Button>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <Text category="label">
            Don't have an account yet?{" "}
            <Text category="label" style={{ textDecorationLine: "underline" }}>
              Register Here!
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
