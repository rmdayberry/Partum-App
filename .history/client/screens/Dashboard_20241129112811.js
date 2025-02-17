import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import DashboardStyles from "../styles/DashboardStyles";
import LocationSvg from "../assets/Svg/locationSvg";

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
      </View>

      <View style={DashboardStyles.frame1}>
        <View style={DashboardStyles.apptHead}>
          <Text
            style={[
              DashboardStyles.upcomingAppointments,
              DashboardStyles.upcomingAppointmentsTypo,
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
            Wednesday, Nov 15 at 10:00 AM
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
            <LocationSvg width={100} height={100} />
          </View>
          <Text
            style={[
              DashboardStyles.daysCountdownContainer,
              DashboardStyles.containerFlexBox,
            ]}
          >
            <Text style={DashboardStyles.daysCountdownContainer2}>
              <Text style={DashboardStyles.daysNumber}>
                <Text style={DashboardStyles.in}>In</Text>
              </Text>
              <Text style={[DashboardStyles.text, DashboardStyles.textTypo]}>
                <Text style={DashboardStyles.daysNumber}> </Text>
                <Text style={DashboardStyles.text2}>2 </Text>
              </Text>
              <Text style={DashboardStyles.daysText}>Days</Text>
            </Text>
          </Text>
          <View style={DashboardStyles.apptNotesBtn}>
            <Text style={DashboardStyles.appointmentNotes}>
              Appoointment Notes
            </Text>
          </View>
          <Pressable
            style={DashboardStyles.needARideContainer}
            onPress={() => navigation.navigate("CommunnityResources")}
          >
            <Text
              style={[DashboardStyles.needARide, DashboardStyles.needARideTypo]}
            >
              Need a ride?
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={[DashboardStyles.frame3, styles.frameLayout]}>
        <View
          style={[
            DashboardStyles.todaysPregnancyTipFrame,
            DashboardStyles.horizontalfullWidthLayout,
          ]}
        >
          <Text
            style={[
              DashboardStyles.todaysPregnancyTips,
              DashboardStyles.pregnancyTypo,
            ]}
          >
            Today's Pregnancy Tips
          </Text>
          <Text style={DashboardStyles.tipDate}>Nov 13, 2024</Text>
          <View style={[]}
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;
