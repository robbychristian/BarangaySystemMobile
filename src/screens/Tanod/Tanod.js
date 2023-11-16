import MapView, { Circle, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { api } from "../../../config/api";

const Tanod = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api
      .get("tanoddeployment/getalltanoddeployments")
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
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ height: "100%", width: "100%" }}
        region={{
          latitude: 14.5829,
          longitude: 121.0726,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {data.length > 0 &&
          data.map((item, index) => {
            return (
              <Circle
                center={{
                  latitude: Number(item.coordinates_lat),
                  longitude: Number(item.coordinates_lng),
                }}
                radius={100}
                fillColor={ rgb(255,193,7, 0.5)}
              />
            );
          })}
      </MapView>
    </View>
  );
};

export default Tanod;
