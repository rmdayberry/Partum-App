import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

const CommunityResources = () => {
  const resources = [
    {
      title: "Transportation",
      description:
        "No access to transportation? Your health insurance plan may offer free rides to appointments. Tap to learn how to set up a ride and access these benefits.",
      buttonText: "Learn More",
      onPress: () => {}, // Add navigation or link here
    },
    {
      title: "WIC Program",
      description:
        "Learn how to access nutritional support and resources for you and your baby through the Women, Infants, and Children program.",
      buttonText: "Find Out More",
      icon: require("../assets/wic-icon.png"), // Placeholder for WIC icon
      onPress: () => {}, // Add WIC website link here
    },
    {
      title: "Insurance",
      description:
        "Need insurance? We partner with Portico to help patients apply for public insurance that covers clinic visits, transportation, and more. Tap to learn how we can assist.",
      buttonText: "Learn More",
      onPress: () => {}, // Add navigation or link here
    },
    {
      title: "Food Banks",
      description:
        "Access nutritious food and groceries for you and your family through local food banks and assistance programs.",
      buttonText: "Find Supplies",
      onPress: () => {}, // Add navigation or link here
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Explore local resources to support you during your pregnancy journey
      </Text>
      <ScrollView contentContainerStyle={styles.content}>
        {resources.map((resource, index) => (
          <View key={index} style={styles.card}>
            {resource.icon && (
              <Image source={resource.icon} style={styles.icon} />
            )}
            <Text style={styles.cardTitle}>{resource.title}</Text>
            <Text style={styles.cardDescription}>{resource.description}</Text>
            <TouchableOpacity style={styles.button} onPress={resource.onPress}>
              <Text style={styles.buttonText}>{resource.buttonText}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  content: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginBottom: 10,
  },
});

export default CommunityResources;
