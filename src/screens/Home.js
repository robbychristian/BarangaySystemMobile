import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { api } from "../../config/api";
import { Card, Text } from "@ui-kitten/components";
import CustomAnnouncementCards from "../components/Cards/CustomAnnouncementCards";

const Home = () => {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    api
      .get("announcements/getlastestannouncement")
      .then((response) => {
        setAnnouncement(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text category="h4" style={{ fontWeight: "700", textAlign: "left" }}>
            LATEST ANNOUNCEMENT
          </Text>
          <Card style={{ width: "90%" }}>
            {announcement !== null ? (
              <CustomAnnouncementCards
                title={announcement.announcement_title}
                description={announcement.announcement_description}
              />
            ) : (
              <Text>No announcements yet!</Text>
            )}
          </Card>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <Text category="h4" style={{ fontWeight: "700", textAlign: "left" }}>
            LATEST NEWS
          </Text>
          <Card style={{ width: "90%" }}>
            {announcement !== null ? (
              <CustomAnnouncementCards
                title={announcement.announcement_title}
                description={announcement.announcement_description}
              />
            ) : (
              <Text>No announcements yet!</Text>
            )}
          </Card>
        </View>
      </ScrollView>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Home;
