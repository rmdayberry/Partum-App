import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { UserContext } from "../contexts/UserContext";
import Header from "../features/Header";
import ProgressBar from "../features/progress/ProgressBar";
import AppointmentContainer from "../features/appointments/AppointmentContainer";
import ResourceSection from "../features/resources/ResourceSection";
import {
  fetchPregnancyProgress,
  fetchWeeklyTip,
  fetchDailyTip,
} from "../api/api";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const Dashboard = () => {
  const { userId } = useContext(UserContext);
  const navigation = useNavigation();
  const [currentWeek, setCurrentWeek] = useState(null);
  const [weeklyTip, setWeeklyTip] = useState(null);
  const [dailyTip, setDailyTip] = useState(null);
  const [loadingTip, setLoadingTip] = useState(true);
  const [loadingDailyTip, setLoadingDailyTip] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.error("No userId provided to Dashboard");
      return;
    }

    const fetchProgressAndTips = async () => {
      try {
        // Fetch progress and calculate current week
        const progress = await fetchPregnancyProgress(userId);
        const week = Math.floor((progress / 100) * 40); // Convert progress % to week
        setCurrentWeek(week);

        // Fetch weekly tip
        const tipData = await fetchWeeklyTip(week);
        setWeeklyTip(tipData);

        // Fetch daily tip
        const dailyTipData = await fetchDailyTip(userId);
        console.log("Daily Tip Data:", dailyTipData); // Log the response
        setDailyTip(dailyTipData);
      } catch (error) {
        console.error("Error fetching daily tip:", error);
        setDailyTip({ tip: "No tip available today." });
      } finally {
        setLoadingTip(false);
        setLoadingDailyTip(false);
      }
    };

    fetchProgressAndTips();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.dashboard}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Pregnancy Overview */}
        <View style={styles.pregnancyOverviewContainer}>
          <View style={styles.frame1}>
            <Text style={styles.pregnancyOverview}>Pregnancy Overview</Text>
            <Text style={styles.youreXWeeksContainer}>
              <Text style={styles.youre}>You're </Text>
              <Text style={styles.x}>
                {currentWeek !== null && currentWeek !== undefined
                  ? currentWeek
                  : "Loading..."}{" "}
              </Text>
              <Text style={styles.youre}>Weeks Along!</Text>
            </Text>

            <ProgressBar userId={userId} />

            {/* Weekly Tip */}
            <View style={styles.weeklyTipContainer}>
              <Text style={styles.tipHeader}>
                What you can expect this week:
              </Text>
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

        {/* Pregnancy Tip of the Day */}
        <View style={styles.dailyTipFrame}>
          <Text style={styles.dailyTipHeader}>Today's Pregnancy Tip</Text>
          {loadingDailyTip ? (
            <Text>Loading...</Text>
          ) : dailyTip && dailyTip.tip ? (
            <Text style={styles.tipText}> {dailyTip.tip}</Text>
          ) : (
            <Text> No tip available for today.</Text>
          )}
        </View>
        <ResourceSection />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f5f7",
  },
  dashboard: {
    flex: 1,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  pregnancyOverviewContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4, // For Android shadow
  },
  pregnancyOverview: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
    textAlign: "center",
    marginBottom: 16,
  },
  weeklyTipContainer: {
    marginTop: 10,
    backgroundColor: "#f7f9fc",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tipHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A5ACD",
    textAlign: "center",
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    lineHeight: 20,
  },
  appointmentSection: {
    width: "90%",
    marginVertical: 20,
  },
  dailyTipFrame: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    width: "90%",
    alignSelf: "center",
  },
  dailyTipHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
    textAlign: "center",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#333333",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default Dashboard;
