import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../components/ProgressBar";
import DashboardStyles from "../styles/DashboardStyles";

const Dashboard = () => {
  const navigation = useNavigation();
  const [pregnancyData, setPregnancyData] = useState(null);

  useEffect(() => {
    const fetchPregnancyData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/pregnancy-data?userId=123"
        );
        const data = await response.json();
        setPregnancyData(data);
      } catch (error) {
        console.error("Error fetching pregnancy data:", error);
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
        />
        <Text
          style={[
            DashboardStyles.pregnancyOverview,
            DashboardStyles.pregnancyTypo,
          ]}
        >
          Pregnancy Overview
        </Text>
        <View>
          {" "}
          {pregnancyData ? (
            <ProgressBar
              currentWeek={pregnancyData.currentWeek}
              totalWeeks={pregnancyData.totalWeeks}
            />
          ) : (
            <Text> Loading...</Text>
          )}
        </View>
      </View>

      <View style={DashboardStyles.frame1}>
        <View style={DashboardStyles.apptHead}>
          <Text
            style={[
              DashboardStyles.upcomingAppointments,
              DashboardStyles.AppointmentTypo,
            ]}
          >
            Upcoming Appointments
          </Text>
          <Image
            style={[DashboardStyles.calIcon, DashboardStyles.calIconPosition]}
            contentFit="cover"
            source={require("../assets/cal-icon.png")}
          />
        </View>
      </View>
      <View style={[DashboardStyles.frame2, DashboardStyles.frame2Layout]}>
        <View
          style={[
            DashboardStyles.appointmentContainer,
            DashboardStyles.appointmentContainerPosition,
          ]}
        >
          <Text style={DashboardStyles.apptDateTime}>
            Wednesday, Nov 15 at 10:00 AM{" "}
          </Text>
          <View style={DashboardStyles.clinicLocation}>
            <Text
              style={[
                DashboardStyles.clinicName,
                DashboardStyles.appointmentContainerPosition,
              ]}
            >
              Riverland Community Health
            </Text>
            <Image style= {[DashboardStyles.locationIcon, DashboardStyles.}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
