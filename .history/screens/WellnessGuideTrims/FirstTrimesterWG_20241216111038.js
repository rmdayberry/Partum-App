import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

const Sleep = () => (
  <View style={styles.scene}>
    <Text style={styles.tabHeading}>Sleep</Text>
    <Text style={styles.content}>Maintain a consistent sleep schedule.</Text>
    <Text style={styles.content}>Avoid caffeine late in the day.</Text>
    <Text style={styles.content}>Try relaxation techniques before bed.</Text>
    <Text style={styles.content}>Use a pregnancy pillow for comfort.</Text>
  </View>
);

const Nutrition = () => (
  <View style={styles.scene}>
    <Text style={styles.tabHeading}>Nutrition</Text>
    <Text style={styles.content}>
      Eat a balanced diet with fruits and vegetables.
    </Text>
    <Text style={styles.content}>Drink plenty of water daily.</Text>
    <Text style={styles.content}>Avoid raw or undercooked foods.</Text>
    <Text style={styles.content}>Take prenatal vitamins as recommended.</Text>
  </View>
);

const FirstTrimester = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: "#6200EE" },
          tabBarIndicatorStyle: { backgroundColor: "#FFC107" },
        }}
      >
        <Tab.Screen name="Sleep" component={Sleep} />
        <Tab.Screen name="Nutrition" component={Nutrition} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tabHeading: {
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
});

export default FirstTrimester;
