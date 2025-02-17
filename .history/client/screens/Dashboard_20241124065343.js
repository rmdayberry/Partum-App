import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DashboardStyles from "../styles/DashboardStyles";

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>Welcome Back!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Pregnancy Overview</Text>
        {/*Progress bar goes here*/}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What You Can Expect This Week:</Text>
        <Text style={styles.paragraph}>
          Your baby is the size of a blueberry! 💙 It’s time to start
          incorporating a bit more folate into your diet. Drink plenty of water
          and aim for balanced meals as your energy needs rise!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {/*add appointment cards here*/}
      </View>
    </ScrollView>
  );
};

export default Dashboard;
