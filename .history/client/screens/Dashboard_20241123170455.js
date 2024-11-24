import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Dashboard = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "f9f9f9",
    padding: 16,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 14,
    color: "#555",
  },
});

export default Dashboard;
