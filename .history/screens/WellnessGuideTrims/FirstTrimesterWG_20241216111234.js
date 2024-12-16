import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const FirstTrimester = () => {
  const [activeTab, setActiveTab] = useState("sleep");

  const renderContent = () => {
    switch (activeTab) {
      case "sleep":
        return (
          <View style={styles.scene}>
            <Text style={styles.tabHeading}>Sleep</Text>
            <Text style={styles.content}>
              Maintain a consistent sleep schedule.
            </Text>
            <Text style={styles.content}>Avoid caffeine late in the day.</Text>
            <Text style={styles.content}>
              Try relaxation techniques before bed.
            </Text>
            <Text style={styles.content}>
              Use a pregnancy pillow for comfort.
            </Text>
          </View>
        );
      case "nutrition":
        return (
          <View style={styles.scene}>
            <Text style={styles.tabHeading}>Nutrition</Text>
            <Text style={styles.content}>
              Eat a balanced diet with fruits and vegetables.
            </Text>
            <Text style={styles.content}>Drink plenty of water daily.</Text>
            <Text style={styles.content}>Avoid raw or undercooked foods.</Text>
            <Text style={styles.content}>
              Take prenatal vitamins as recommended.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "sleep" && styles.activeTab]}
          onPress={() => setActiveTab("sleep")}
        >
          <Text
            style={[styles.tabText, activeTab === "sleep" && styles.activeText]}
          >
            Sleep
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "nutrition" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("nutrition")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "nutrition" && styles.activeText,
            ]}
          >
            Nutrition
          </Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#6200EE",
    paddingVertical: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  tabText: {
    fontSize: 14,
    color: "#fff",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFC107",
  },
  activeText: {
    fontWeight: "bold",
    color: "#FFC107",
  },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginVertical: 4,
  },
});

export default FirstTrimester;
