import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
} from "react-native";

const openLink = async (url) => {
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Sorry, this link cannot be opened on your device.");
    }
  } catch (error) {
    console.error("An error occurred while trying to open the link:", error);
    alert("Something went wrong. Please try again later.");
  }
};

const CommunityResources = () => {
  const resources = [
    {
      title: "Transportation",
      description:
        "No access to transportation? Your health insurance plan may offer free rides to appointments. Tap to learn how to set up a ride and access these benefits.",
      buttonText: "Learn More",
      icon: require("../assets/transportation.png"),
      onPress: () => openLink("https://example.com/transportation"),
    },
    {
      title: "WIC Program",
      description:
        "Learn how to access nutritional support and resources for you and your baby through the Women, Infants, and Children program.",
      buttonText: "Find Out More",
      icon: require("../assets/wic-icon.png"),
      onPress: () =>
        openLink("https://www.health.state.mn.us/people/wic/index.html"),
    },
    {
      title: "Insurance",
      description:
        "Need insurance? We partner with Portico to help patients apply for public insurance that covers clinic visits, transportation, and more. Tap to learn how we can assist.",
      buttonText: "Learn More",
      icon: require("../assets/healthcare.png"),
      onPress: () => openLink("https://example.com/insurance"),
    },
    {
      title: "Food Banks",
      description:
        "Access nutritious food and groceries for you and your family through local food banks and assistance programs.",
      buttonText: "Find Supplies",
      icon: require("../assets/foodBank.png"),
      onPress: () => openLink("https://example.com/foodbanks"),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Resources</Text>
        <Text style={styles.subtitle}>
          Explore local resources to support you during your pregnancy journey
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {resources.map((resource, index) => (
          <View key={index} style={styles.card}>
            <Image source={resource.icon} style={styles.icon} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{resource.title}</Text>
              <Text style={styles.cardDescription}>{resource.description}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={resource.onPress}
              >
                <Text style={styles.buttonText}>{resource.buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Match your overall app background color from Dashboard:
  container: {
    flex: 1,
    backgroundColor: "#F4F5FB",
    paddingTop: 16,
  },
  header: {
    marginBottom: 16,
    paddingHorizontal: 20,
    marginTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6A5ACD", // Accent color matches the Dashboard
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#555",
    textAlign: "center",
    marginHorizontal: 10,
    lineHeight: 20,
  },
  content: {
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 16,
    // Add a similar shadow as in the Dashboard:
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 16,
    alignSelf: "center",
  },
  cardContent: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#6A5ACD", // Use the accent purple
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
});

export default CommunityResources;
