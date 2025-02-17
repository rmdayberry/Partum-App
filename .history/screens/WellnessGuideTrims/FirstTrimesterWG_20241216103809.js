import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

const FirstTrimester = () => {
  const initialLayout = { width: Dimensions.get("window").width };

  // State for active tab index
  const [index, setIndex] = useState(0);

  // Define routes for tabs
  const [routes] = useState([
    { key: "sleep", title: "Sleep" },
    { key: "nutrition", title: "Nutrition" },
  ]);

  // Render content for each tab
  const renderScene = ({ route }) => {
    console.log("Rendering tab:", route.key); // Debugging the active tab key

    // Strict mapping for each tab
    if (route.key === "sleep") {
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
    } else if (route.key === "nutrition") {
      return (
        <View style={styles.scene}>
          <Text style={styles.heading}>Nutrition</Text>
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
    }

    return null; // Fallback for unexpected routes
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageHeading}>First Trimester</Text>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(newIndex) => {
          console.log("Tab index changed to:", newIndex); // Debugging tab index changes
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

// Styles
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
