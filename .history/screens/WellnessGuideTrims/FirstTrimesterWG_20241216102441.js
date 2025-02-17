import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";

const FirstTrimester = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "sleep", title: "Sleep" },
    { key: "nutrition", title: "Nutrition" },
    { key: "mentalHealth", title: "Mental Health" },
    { key: "exercise", title: "Exercise" },
    { key: "symptoms", title: "Symptoms" },
  ]);

  const renderScene = ({ route }) => (
    <View style={styles.scene}>
      <Text>{route.title}</Text>
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={styles.tabBar}
          indicatorStyle={styles.indicator}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
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
