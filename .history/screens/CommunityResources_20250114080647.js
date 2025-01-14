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

  // The `return` is now inside the `CommunityResources` component
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
  container: {
    flex: 1,
    backgroundColor: "#F9FAFF",
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 50,
  },
  pregnancyOverviewContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 20,
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6A5ACD",
    textAlign: "center",
    marginBottom: 12,
  },
  pregnancyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 10,
    fontWeight: "600",
  },
  highlight: {
    color: "#6A5ACD",
    fontWeight: "bold",
    fontSize: 18,
  },
  weeklyTipContainer: {
    backgroundColor: "#EFEFFF",
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D0D0FF",
  },
  weeklyIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  tipHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  tipText: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 22,
    marginVertical: 10,
  },
  noTipText: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 20,
    marginVertical: 10,
    width: "90%",
  },
  dailyTipFrame: {
    backgroundColor: "#FFF5EB",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    padding: 20,
    marginVertical: 10,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD3A6",
  },
  dailyIcon: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
});

export default CommunityResources;
