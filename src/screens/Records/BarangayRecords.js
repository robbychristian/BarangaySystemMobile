import { Card, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import CustomBarangayRecordsCard from "../../components/Cards/CustomBarangayRecordsCard";
import { api } from "../../../config/api";
import { useSelector } from "react-redux";

const BarangayRecords = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get(`services/getalldocuments?user_id=${user.id}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
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
                <CustomBarangayRecordsCard
                  docType={item.document_type}
                  email={item.email}
                  id={item.id}
                  name={item.personal_info.name}
                  key={index}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default BarangayRecords;
