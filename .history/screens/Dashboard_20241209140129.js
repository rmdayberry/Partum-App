import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import AppointmentContainer from "../components/AppointmentContainer";
import { fetchPregnancyProgress, fetchWeeklyTip, fetchDailyTip } from "../api/api";
import {
  FontSize,
  FontFamily,
  Color,
  Border,
} from "../GlobalStyles";

const Dashboard = () => {
  const navigation = useNavigation();
  const [currentWeek, setCurrentWeek] = useState(null);
  const [weeklyTip, setWeeklyTip] = useState(null);
  const [dailyTip, setDailyTip] = useState(null);
  const [loadingTip, setLoadingTip] = useState(true);
  const [loadingDailyTip, setLoadingDailyTip] = useState(true);
  const preferredLanguage = "en";
  const userId = "6751f6871fb757c8ce3efb3d"; // Test user from database

  useEffect(() => {
    const fetchProgressAndTip = async () => {
      try {
        // Fetch progress and calculate current week
        const { progress, dueDate } = await fetchPregnancyProgress(userId);
        const week = Math.floor((progress / 100) * 40); // Convert progress % to week
        setCurrentWeek(week);

        // Fetch weekly tip
        const weeklyTipData = await fetchWeeklyTip(week);
        setWeeklyTip(weeklyTipData);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
      } finally {
        setLoadingTip(false);
      }
    };

    const fetchDailyTipForDay = async () => {
      try {
        // Fetch progress and calculate current day
        const { progress, dueDate } = await fetchPregnancyProgress(userId);
        const startDate = new Date(new Date(dueDate).getTime() - 280 * 24 * 60 * 60 * 1000);
        const currentDate = new Date();
        const currentDay = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

        const dailyTipData = await fetchDailyTip(currentDay);
        setDailyTip(dailyTipData);
      } catch (error) {
        console.error("Error fetching daily tip:", error);
      } finally {
        setLoadingDailyTip(false);
      }
    };

    fetchProgressAndTip();
    fetchDailyTipForDay();
  }, []);

  return (
    <ScrollView
      style={styles.dashboard}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <Header />

      {/* Pregnancy Overview */}
      <View style={styles.pregnancyOverviewContainer}>
        <View style={styles.frame1}>
          <Text style={styles.pregnancyOverview}>Pregnancy Overview</Text>
          <Text style={styles.youreXWeeksContainer}>
            <Text style={styles.youre}>You're </Text>
            <Text style={styles.x}>{currentWeek} </Text>
            <Text style={styles.youre}>Weeks Along!</Text>
          </Text>
          <ProgressBar userId={userId} />

          {/* Weekly Tip */}
          <View style={styles.weeklyTipContainer}>
            <Text style={styles.tipHeader}>What you can expect this week:</Text>
            {loadingTip ? (
              <Text>Loading...</Text>
            ) : weeklyTip ? (
              <Text style={styles.tipText}>{weeklyTip.tip}</Text>
            ) : (
              <Text>No tip available for this week.</Text>
            )}
          </View>
        </View>
      </View>

      {/* Appointment Container */}
      <View style={styles.appointmentSection}>
        <AppointmentContainer />
      </View>

      {/* Today's Pregnancy Tips */}
      <View style={styles.todaysPregnancyTipFrame}>
        <Text style={styles.todaysPregnancyTips}>Today’s Pregnancy Tips</Text>
        {loadingDailyTip ? (
          <Text>Loading...</Text>
        ) : dailyTip ? (
          <Text style={styles.tipText}>
            {preferredLanguage === "en" ? dailyTip.tip : dailyTip.tipSpanish}
          </Text>
        ) : (
          <Text>No daily tip available.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    backgroundColor: Color.nEW,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 50,
  },
  pregnancyOverviewContainer: {
    width: "90%",
    backgroundColor: Color.graysWhite,
    borderRadius: Border.br_xs,
    borderColor: Color.colorGray_100,
    borderWidth: 1,
    padding: 16,
    marginTop: 20,
  },
  frame1: {
    alignItems: "center",
    marginBottom: 16,
  },
  pregnancyOverview: {
    fontSize: FontSize.size_xs,
    fontWeight: "700",
    fontFamily: FontFamily.montserrat,
    color: "#696969",
    textAlign: "center",
    marginBottom: 20,
  },
  youreXWeeksContainer: {
    fontSize: FontSize.m3BodyLarge_size,
    fontFamily: FontFamily.montserrat,
    textAlign: "center",
  },
  weeklyTipContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  tipHeader: {
    fontSize: FontSize.size_lg,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#727272",
  },
  tipText: {
    fontSize: FontSize.m3LabelLarge_size,
    fontFamily: FontFamily.montserrat,
    textAlign: "center",
    marginHorizontal: 20,
  },
  appointmentSection: {
    alignSelf: "center",
    width: "90%",
    marginTop: 20,
  },
  todaysPregnancyTipFrame: {
    padding: 16,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todaysPregnancyTips: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Dashboard;

