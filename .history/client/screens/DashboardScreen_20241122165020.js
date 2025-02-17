import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const DashboardScreen = () => {
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
        <Text style={styles.paragraph}></Text>
      </View>
    </ScrollView>
  );
};
