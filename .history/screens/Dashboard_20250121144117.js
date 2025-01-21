import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
} from "react-native";
import { UserContext } from "../contexts/UserContext";
import { dashboardTranslations } from "../translations/DashboardTranslations";
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
  // 1) Destructure *both* userId **and** languagePreference from context
  const { userId, languagePreference } = useContext(UserContext);

  const [currentWeek, setCurrentWeek] = useState(null);
  const [weeklyTip, setWeeklyTip] = useState(null);
  const [dailyTip, setDailyTip] = useState(null);
  const [loadingWeeklyTip, setLoadingWeeklyTip] = useState(true);
  const [loadingDailyTip, setLoadingDailyTip] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Animation for fade-in

  // 2) Then you can read from dashboardTranslations using languagePreference
  const t =
    dashboardTranslations[languagePreference] || dashboardTranslations.English;

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

        // Pass languagePreference when fetching the weekly tip
        const weeklyTipData = await fetchWeeklyTip(week, languagePreference);
        setWeeklyTip(weeklyTipData);

        const dailyTipData = await fetchDailyTip(userId);
        setDailyTip(dailyTipData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDailyTip({ tip: t.noDailyTip });
      } finally {
        setLoadingWeeklyTip(false);
        setLoadingDailyTip(false);
      }
    };

    fetchProgressAndTips();

    // Trigger fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [userId, languagePreference]); // Add languagePreference as a dependency

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Pregnancy Overview with Progress Bar and Weekly Tip */}
        <Animated.View
          style={[styles.pregnancyOverviewContainer, { opacity: fadeAnim }]}
        >
          <Text style={styles.sectionHeader}>{t.pregnancyOverview}</Text>

          <Text style={styles.pregnancyText}>
            {t.youAre}{" "}
            <Text style={styles.highlight}>
              {currentWeek !== null && currentWeek !== undefined
                ? currentWeek
                : t.loading}
            </Text>{" "}
            {t.weeksAlong}
          </Text>

          <ProgressBar userId={userId} />

          <View style={styles.weeklyTipContainer}>
            <Image
              style={styles.weeklyIcon}
              source={require("../assets/pregnantPerson.png")}
            />
            <Text style={styles.tipHeader}>{t.whatToExpectHeader}</Text>

            {loadingWeeklyTip ? (
              <Text style={styles.loadingText}>{t.loading}</Text>
            ) : weeklyTip && weeklyTip.tip ? (
              <Text style={styles.tipText}>{weeklyTip.tip}</Text>
            ) : (
              <Text style={styles.noTipText}>{t.noTip}</Text>
            )}
          </View>
        </Animated.View>

        {/* Appointment Container */}
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <AppointmentContainer />
        </Animated.View>

        {/* Daily Tip */}
        {/* Daily Tip Section */}
        <Card style={styles.dailyTipFrame}>
          <View style={styles.dailyTipHeaderContainer}>
            <Image
              source={require("../assets/wateringCan.png")}
              style={styles.dailyTipIcon}
            />
            <Text style={styles.sectionHeader}>{t.dailyTipHeader}</Text>
          </View>
          {loadingDailyTip ? (
            <Text style={styles.loadingText}>{t.loading}</Text>
          ) : dailyTip && dailyTip.tip ? (
            <Text style={styles.dailyTipText}>{dailyTip.tip}</Text>
          ) : (
            <Text style={styles.noTipText}>{t.noDailyTip}</Text>
          )}
        </Card>

        <ResourceSection />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
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
    textAlign: "center",
    marginBottom: 12,
  },
  pregnancyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
    fontWeight: "600",
  },
  highlight: {
    color: "#6A5ACD",
    fontWeight: "bold",
    fontSize: 18,
  },
  weeklyTipContainer: {
    backgroundColor: "#EFEFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D0D0FF",
  },
  weeklyIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  tipHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
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
    lineHeight: 22,
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
    backgroundColor: "#FFF5EB",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 20,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD3A6",
  },
  dailyIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
});

export default Dashboard;
