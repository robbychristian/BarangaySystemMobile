import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../auth/Login";
import Register from "../auth/Register";

const AuthStack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
