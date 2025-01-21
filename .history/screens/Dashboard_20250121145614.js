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

const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const Dashboard = () => {
  const { userId, languagePreference } = useContext(UserContext);

  const [currentWeek, setCurrentWeek] = useState(null);
  const [weeklyTip, setWeeklyTip] = useState(null);
  const [dailyTip, setDailyTip] = useState(null);
  const [loadingWeeklyTip, setLoadingWeeklyTip] = useState(true);
  const [loadingDailyTip, setLoadingDailyTip] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

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

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [userId, languagePreference]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Animated.View
          style={[styles.greetingContainer, { opacity: fadeAnim }]}
        >
          <Text style={styles.greetingText}>
            {t.welcome}, <Text style={styles.highlight}>User!</Text>
          </Text>
        </Animated.View>

        <LinearGradient
          colors={["#FFFFFF", "#F3F4FF"]}
          style={styles.pregnancyOverviewContainer}
        >
          <Text style={styles.sectionHeader}>{t.pregnancyOverview}</Text>
          <Text style={styles.pregnancyText}>
            {t.youAre}{" "}
            <Text style={styles.highlight}>
              {currentWeek !== null ? currentWeek.toString() : t.loading}
            </Text>{" "}
            {t.weeksAlong}
          </Text>

          <ProgressBar
            userId={userId}
            progressColor={
              currentWeek < 13
                ? "#A3E635"
                : currentWeek < 27
                ? "#FACC15"
                : "#FB7185"
            }
          />

          <View style={styles.tipContainer}>
            <Text style={styles.tipHeader}>{t.whatToExpectHeader}</Text>
            <Image
              source={require("../assets/berry.png")}
              style={styles.tipIcon}
            />
            <Text style={styles.tipText}>
              {loadingWeeklyTip
                ? t.loading
                : (weeklyTip?.tip ?? t.noTip).toString()}
            </Text>
          </View>
        </LinearGradient>

        <Card>
          <AppointmentContainer />
        </Card>

        <Card style={styles.dailyTipFrame}>
          <View style={styles.dailyTipHeaderContainer}>
            <Image
              source={require("../assets/wateringCan.png")}
              style={styles.dailyTipIcon}
            />
            <Text style={styles.sectionHeader}>{t.dailyTipHeader}</Text>
          </View>
          <Text style={styles.dailyTipText}>
            {loadingDailyTip
              ? t.loading
              : (dailyTip?.tip ?? t.noDailyTip).toString()}
          </Text>
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
  greetingContainer: {
    marginVertical: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#6A5ACD",
  },
  pregnancyOverviewContainer: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  card: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

export default Dashboard;
