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
        const progress = await fetchPregnancyProgress(userId);
        const week = Math.floor((progress / 100) * 40);
        setCurrentWeek(week);

        const tipData = await fetchWeeklyTip(week);
        setWeeklyTip(tipData);

        const dailyTipData = await fetchDailyTip(userId);
        setDailyTip(dailyTipData);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Pregnancy Overview</Text>
          <Text style={styles.pregnancyText}>
            You're{" "}
            <Text style={styles.highlight}>{currentWeek || "Loading..."}</Text>{" "}
            weeks along!
          </Text>
          <ProgressBar userId={userId} />
        </View>

        <View style={styles.card}>
          <AppointmentContainer />
        </View>

        <View style={styles.card}>
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
    textAlign: "center",
    marginBottom: 10,
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
});

export default Dashboard;
