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
      try{
        const response = await fetch(
          
        )
      }
      setLoading(true);
      const data = await fetchPregnancyData();
      if (data) {
        setWeeks(data.currentWeek); // Update with current week from API
      }
      setLoading(false);
    };
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

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
          <Text>You're {weeks} Weeks Along</Text>
          <ProgressBar progress={(weeks / 40) * 100} />
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
