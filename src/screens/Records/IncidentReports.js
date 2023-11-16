import { Card, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { api } from "../../../config/api";
import { useSelector } from "react-redux";
import CustomIncidentReportCard from "../../components/Cards/CustomIncidentReportCard";
import moment from "moment";

const IncidentReports = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    api
      .get(`reports/getallblotterreports?user_id=${user.id}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View>
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <CustomIncidentReportCard
                  key={index}
                  place={item.incident_narrative.place_of_incident}
                  reported={item.reporting_person.name}
                  suspect={item.suspect_data.name}
                  toi={moment(
                    item.incident_narrative.date_time_incident
                  ).format("LL hh:mm A")}
                  tor={moment(item.incident_narrative.date_time_report).format(
                    "LL hh:mm A"
                  )}
                  type={item.incident_type}
                  victim={item.victim_data.name}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default IncidentReports;
