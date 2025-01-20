import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import AppointmentContainer from "../components/AppointmentContainer";
import { fetchPregnancyProgress, fetchWeeklyTip, fetchDailyTip } from "../api/api";
import { FontSize, FontFamily, Color, Border } from "../GlobalStyles";

const Dashboard = () => {
  const navigation = useNavigation();
  const [currentWeek, setCurrentWeek] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);
  const [weeklyTip, setWeeklyTip] = useState(null);
  const [dailyTip, setDailyTip] = useState(null);
  const [loadingTip, setLoadingTip] = useState(true);
  const [loadingDailyTip, setLoadingDailyTip] = useState(true);
  const preferredLanguage = "en";
  const userId = "6751f6871fb757c8ce3efb3d"; // Test user from database

  useEffect(() => {
    const fetchProgressAndTips = async () => {
      try {
        // Fetch pregnancy progress
        const progressData = await fetchPregnancyProgress(userId);
        const progress = parseFloat(progressData.progress); // Ensure numeric value

        if (!isNaN(progress)) {
          // Calculate week and day based on progress
          const week = Math.min(Math.max(Math.floor((progress / 100) * 40), 1), 40);
          const day = Math.min(Math.max(Math.floor((progress / 100) * 280), 1), 280);

          setCurrentWeek(week);
          setCurrentDay(day);

          // Fetch weekly tip if week is valid
          if (week >= 1 && week <= 40) {
            const weeklyTipData = await fetchWeeklyTip(week);
            setWeeklyTip(weeklyTipData);
          } else {
            console.warn("Invalid week calculated:", week);
          }

          // Fetch daily tip if day is valid
          if (day >= 1 && day <= 280) {
            const dailyTipData = await fetchDailyTip(day);
            setDailyTip(dailyTipData);
          } else {
            console.warn("Invalid day calculated:", day);
          }
        } else {
          console.error("Invalid progress value:", progress);
        }
      } catch (error) {
        console.error("Error fetching pregnancy data:", error);
      } finally {
        setLoadingTip(false);
        setLoadingDailyTip(false);
      }
    };

    fetchProgressAndTips();
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
            <Text style={styles.x}>
              {currentWeek !== null ? currentWeek : "Loading..."}{" "}
            </Text>
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
  // Styles remain unchanged
});

export default Dashboard;




