import { Card, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

const CustomIncidentReportCard = ({
  type,
  reported,
  place,
  suspect,
  victim,
  tor,
  toi,
}) => {
  return (
    <Card>
      <Text category="h5" style={{ color: "#0284C7" }}>
        Incident Type: {type}
      </Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text category="label">Reported By: {reported} </Text>
        <Text category="label">Place: {place} </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text category="label">Suspect: {suspect} </Text>
        <Text category="label">Victim: {victim} </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text category="label">Time of Report: {tor} </Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text category="label">Time of Incident: {toi} </Text>
      </View>
    </Card>
  );
};

export default CustomIncidentReportCard;
