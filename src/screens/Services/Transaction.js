import { Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { api } from "../../../config/api";
import { DataTable } from "react-native-paper";

const Transaction = () => {
  const { user } = useSelector((state) => state.auth);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    api
      .post("services/getallunpaidtransactions", {
        user_id: user.id,
      })
      .then((response) => {
        console.log(response.data);
        setTransactions(response.data);
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
            <DataTable.Title>Document Type</DataTable.Title>
          </DataTable.Header>
          {transactions.length > 0 &&
            transactions.map((item, index) => {
              return (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{item.id}</DataTable.Cell>
                  <DataTable.Cell>₱{item.payment_price}</DataTable.Cell>
                  <DataTable.Cell>Brgy Clearance</DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default Transaction;
