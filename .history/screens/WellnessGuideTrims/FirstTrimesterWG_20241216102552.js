import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

const FirstTrimester = () => {
  const initialLayout = { width: Dimensions.get("window").width };

  // Explicitly define routes
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "sleep", title: "Sleep" },
    { key: "nutrition", title: "Nutrition" },
    { key: "mentalHealth", title: "Mental Health" },
    { key: "exercise", title: "Exercise" },
    { key: "symptoms", title: "Symptoms" },
  ]);

  // Define individual content for each tab
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "sleep":
        return (
          <View style={styles.scene}>
            <Text style={styles.heading}>Sleep</Text>
            <Text style={styles.content}>Content for Sleep</Text>
          </View>
        );
      case "nutrition":
        return (
          <View style={styles.scene}>
            <Text style={styles.heading}>Nutrition</Text>
            <Text style={styles.content}>Content for Nutrition</Text>
          </View>
        );
      case "mentalHealth":
        return (
          <View style={styles.scene}>
            <Text style={styles.heading}>Mental Health</Text>
            <Text style={styles.content}>Content for Mental Health</Text>
          </View>
        );
      case "exercise":
        return (
          <View style={styles.scene}>
            <Text style={styles.heading}>Exercise</Text>
            <Text style={styles.content}>Content for Exercise</Text>
          </View>
        );
      case "symptoms":
        return (
          <View style={styles.scene}>
            <Text style={styles.heading}>Symptoms to Look Out For</Text>
            <Text style={styles.content}>Content for Symptoms</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeading}>First Trimester</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(newIndex) => {
          console.log("Tab index changed:", newIndex);
          setIndex(newIndex);
        }}
        initialLayout={initialLayout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicator}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  pageHeading: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: "#333",
  },
  tabBar: {
    backgroundColor: "#6200EE",
  },
  indicator: {
    backgroundColor: "#FFC107",
    height: 3,
  },
});

export default FirstTrimester;
