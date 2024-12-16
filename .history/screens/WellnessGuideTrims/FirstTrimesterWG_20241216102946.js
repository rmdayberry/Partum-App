import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

const FirstTrimester = () => {
  const initialLayout = { width: Dimensions.get("window").width };

  // State for the active tab index
  const [index, setIndex] = useState(0);

  // Single route for Sleep tab
  const [routes] = useState([{ key: "sleep", title: "Sleep" }]);

  // Render content for the Sleep tab
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "sleep":
        return (
          <View style={styles.scene}>
            <Text style={styles.heading}>Sleep</Text>
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
    marginVertical: 4,
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
