import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { DataTable } from "react-native-paper";
import { useSelector } from "react-redux";
import { api } from "../../../config/api";

const TransactionRecords = () => {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    api
      .post("reports/getallpaidtransactions", {
        user_id: user.id,
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>ID</DataTable.Title>
            <DataTable.Title>Price</DataTable.Title>
          </DataTable.Header>
          {data.length > 0 &&
            data.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.id}</DataTable.Cell>
                  <DataTable.Cell>₱{item.payment_price}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default TransactionRecords;
