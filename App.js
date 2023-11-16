import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { Provider as StoreProvider } from "react-redux";
import Login from "./src/auth/Login";
import MainNavigation from "./src/navigation/MainNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./src/store";
import Container from "toastify-react-native";
import { enableLatestRenderer } from "react-native-maps";

export default function App() {
  enableLatestRenderer();
  return (
    <>
      <SafeAreaProvider>
        <StoreProvider store={store}>
          <PaperProvider>
            <ApplicationProvider {...eva} theme={eva.light}>
              <Container
                position="top"
                textStyle={{ fontSize: 16 }}
                width={"90%"}
              />
              <MainNavigation />
            </ApplicationProvider>
          </PaperProvider>
        </StoreProvider>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
