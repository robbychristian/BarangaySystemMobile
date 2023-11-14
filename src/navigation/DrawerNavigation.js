import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import Home from "../screens/Home";
import Services from "../screens/Services/Services";
import Announcement from "../screens/Announcement/Announcement";
import BarangayNews from "../screens/Announcement/BarangayNews";
import { useDispatch } from "react-redux";
import { Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";
import DocumentSubmission from "../screens/Services/DocumentSubmission";
import BlotterReports from "../screens/Services/BlotterReports";
import Reservations from "../screens/Services/Reservations";
import Transaction from "../screens/Services/Transaction";
import Records from "../screens/Records/Records";

const DrawerStack = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const dispatch = useDispatch();
  return (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={(index) => {
        navigation.navigate(state.routeNames[index.row]);
      }}
      style={{ marginTop: 50 }}
    >
      <DrawerItem title={`Home`} />
      <DrawerItem title={`Services`} />
      <DrawerItem title={`Announcements`} />
      <DrawerItem title={`Records`} />
    </Drawer>
  );
};

const DrawerNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <DrawerStack.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(2 132 199)",
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      <DrawerStack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: "DASHBOARD", headerTitleAlign: "center" }}
      />
      <DrawerStack.Screen
        name="Services"
        component={Services}
        options={{ headerTitle: "SERVICES", headerTitleAlign: "center" }}
      />
      <DrawerStack.Screen
        name="Announcement"
        component={Announcement}
        options={{ headerTitle: "ANNOUNCEMENTS", headerTitleAlign: "center" }}
      />
      <DrawerStack.Screen
        name="Records"
        component={Records}
        options={{ headerTitle: "RECORDS", headerTitleAlign: "center" }}
      />
      {/* HIDDEN */}
      <DrawerStack.Screen
        name="DocumentSubmission"
        component={DocumentSubmission}
        options={{
          headerTitle: "DOC. SUBMISSION",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="BlotterReport"
        component={BlotterReports}
        options={{
          headerTitle: "BLOTTER REPORT",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="Reservations"
        component={Reservations}
        options={{
          headerTitle: "RESERVATIONS",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="Transactions"
        component={Transaction}
        options={{
          headerTitle: "TRANSACTIONS",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="BarangayNews"
        component={BarangayNews}
        options={{ headerTitle: "BARANGAY NEWS", headerTitleAlign: "center" }}
      />
    </DrawerStack.Navigator>
  );
};

export default DrawerNavigation;
