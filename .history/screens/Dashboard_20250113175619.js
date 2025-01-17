import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
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

const Dashboard = () => {
  const { userId } = useContext(UserContext);
  const [currentWeek, setCurrentWeek] = useState(null);
  const [weeklyTip, setWeeklyTip] = useState(null);
  const [dailyTip, setDailyTip] = useState(null);
  const [loadingWeeklyTip, setLoadingWeeklyTip] = useState(true);
  const [loadingDailyTip, setLoadingDailyTip] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.error("No userId provided to Dashboard");
      return;
    }

    const fetchProgressAndTips = async () => {
      try {
        const progress = await fetchPregnancyProgress(userId);
        const week = Math.floor((progress / 100) * 40);
        setCurrentWeek(week);

        const weeklyTipData = await fetchWeeklyTip(week);
        setWeeklyTip(weeklyTipData);

        const dailyTipData = await fetchDailyTip(userId);
        setDailyTip(dailyTipData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDailyTip({ tip: "No tip available today." });
      } finally {
        setLoadingWeeklyTip(false);
        setLoadingDailyTip(false);
      }
    };

    fetchProgressAndTips();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Pregnancy Overview with Progress Bar and Weekly Tip */}
        <View style={styles.pregnancyOverviewContainer}>
          <Text style={styles.sectionHeader}>Pregnancy Overview</Text>
          <Text style={styles.pregnancyText}>
            You're{" "}
            <Text style={styles.highlight}>{currentWeek || "Loading..."}</Text>{" "}
            weeks along!
          </Text>
          <ProgressBar userId={userId} />
          <View style={styles.weeklyTipContainer}>
            <Text style={styles.tipHeader}>What to Expect This Week</Text>
            {loadingWeeklyTip ? (
              <Text style={styles.loadingText}>Loading...</Text>
            ) : weeklyTip && weeklyTip.tip ? (
              <Text style={styles.tipText}>{weeklyTip.tip}</Text>
            ) : (
              <Text style={styles.noTipText}>No tip available this week.</Text>
            )}
          </View>
        </View>

        {/* Appointment Container */}
        <View style={styles.card}>
          <AppointmentContainer />
        </View>

        {/* Daily Tip */}
        <View style={styles.dailyTipFrame}>
          <Text style={styles.sectionHeader}>Today's Pregnancy Tip</Text>
          {loadingDailyTip ? (
            <Text style={styles.loadingText}>Loading...</Text>
          ) : dailyTip && dailyTip.tip ? (
            <Text style={styles.tipText}>{dailyTip.tip}</Text>
          ) : (
            <Text style={styles.noTipText}>No tip available for today.</Text>
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
    backgroundColor: "#F4F5FB",
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 50,
  },
  pregnancyOverviewContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 20,
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 10,
    textAlign: "center",
  },
  pregnancyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
  },
  highlight: {
    color: "#6A5ACD",
    fontWeight: "bold",
  },
  weeklyTipContainer: {
    backgroundColor: "#F4F1FC",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  tipHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6A5ACD",
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  tipText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginVertical: 10,
  },
  noTipText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 20,
    marginVertical: 10,
    width: "90%",
  },
  dailyTipFrame: {
    backgroundColor: "#FFEDE6",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 20,
    marginVertical: 10,
    width: "90%",
  },
});

export default Dashboard;
