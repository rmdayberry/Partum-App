import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../components/ProgressBar";
import DashboardStyles from "../styles/DashboardStyles";

const Dashboard = () => {
  const navigation = useNavigation();
  const [weeks, setWeeks] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPregnancyData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/pregnancy-data?userId=123"
        );
        const data = await response.json();
        setPregnancyData(data);
      } catch (error) {
        console.error("Erro fetching pregnancy data:", error);
      }
    };

    fetchPregnancyData();
  }, []);

  return (
    <ScrollView
      style={[DashboardStyles.dashboard, DashboardStyles.containerBorder]}
    >
      <View style={[DashboardStyles.header, DashboardStyles.containerBorder]}>
        <Image
          style={DashboardStyles.riverlandIcon}
          contentFit="cover"
          source={require("../assets/Riverland.png")}
        />
        <Text
          style={[DashboardStyles.partum, DashboardStyles.containerFlexBox]}
        >
          Partum
        </Text>
      </View>

      <View style={[DashboardStyles.frame, DashboardStyles.frameLayout1]}>
        <View
          style={[
            DashboardStyles.pregnancyOverviewContainer,
            DashboardStyles.frameLayout1,
          ]}
        >
          <Text
            style={[
              DashboardStyles.pregnancyOverview,
              DashboardStyles.pregnancyTypo,
            ]}
          >
            Pregnancy Overview
          </Text>
          <View>
            {pregnancyData && (
              <ProgressBar
                currentWeek={pregnancyData.currentWeek}
                totalWeeks={pregnancyData.totalWeeks}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
