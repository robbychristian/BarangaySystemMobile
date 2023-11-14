import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import CustomNewsCard from "../../components/Cards/CustomNewsCard";
import { useDispatch, useSelector } from "react-redux";
import { getBarangayNews } from "../../store/announcements/BarangayNews";
import Loading from "../../components/Loading";

const BarangayNews = () => {
  const { news, loading } = useSelector((state) => state.barangay);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const response = await dispatch(getBarangayNews());
      console.log(news);
    })();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Loading loading={loading} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ alignItems: "center" }}>
          {news.length > 0 &&
            news.map((item, index) => {
              return (
                <CustomNewsCard
                  key={index}
                  title={item.news_title}
                  description={item.news_description}
                />
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default BarangayNews;
