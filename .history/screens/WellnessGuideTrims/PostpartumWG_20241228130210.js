import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

// Placeholder images
const graphics = {
  periBottle: require("../../assets/graphic_periBottle.png"),
  recoveryTips: require("../../assets/graphic_recoveryTips.png"),
};

// Content for Postpartum page
const content = {
  English: {
    header: "Postpartum Care",
    subtitle: "Caring for you and your baby in the first weeks.",
    sections: [
      {
        title: "Pain Management",
        details: [
          {
            subtitle: "For Vaginal Birth",
            points: [
              "Take 600mg ibuprofen (Motrin) every 6-8 hours as needed for pain.",
              "Alternate with 650mg acetaminophen (Tylenol) every 3-4 hours if pain persists.",
            ],
          },
          {
            subtitle: "For Cesarean Birth",
            points: [
              "Start with ibuprofen and acetaminophen for pain relief.",
              "Add oxycodone as prescribed if pain persists.",
            ],
          },
        ],
      },
      {
        title: "Caring for Your Vagina",
        carouselItems: [
          {
            title: "Use a Peri-Bottle",
            description:
              "Fill with warm water and rinse your bottom after using the bathroom.",
            image: graphics.periBottle,
          },
          {
            title: "Make Soothing Padcicles",
            description:
              "Use witch hazel, aloe vera, and pads to make cooling 'padcicles'.",
            image: graphics.recoveryTips,
          },
        ],
      },
    ],
  },
};

const Postpartum = () => {
  const { userId } = useContext(UserContext);
  const [language, setLanguage] = useState("English");
  const [userContent, setUserContent] = useState(content.English);

  useEffect(() => {
    const fetchLanguagePreference = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/users/${userId}`
        );
        const preferredLanguage = response.data.languagePreference || "English";
        setLanguage(preferredLanguage);
        setUserContent(content[preferredLanguage]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchLanguagePreference();
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{userContent.header}</Text>
        <Text style={styles.subtitle}>{userContent.subtitle}</Text>
      </View>

      {/* Sections */}
      {userContent.sections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>

          {/* Details */}
          {section.details && (
            <View>
              {section.details.map((detail, i) => (
                <View key={i}>
                  <Text style={styles.detailSubtitle}>{detail.subtitle}</Text>
                  {detail.points.map((point, j) => (
                    <Text key={j} style={styles.detailPoint}>
                      • {point}
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Carousel Items */}
          {section.carouselItems && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.carouselContainer}
            >
              {section.carouselItems.map((item, i) => (
                <View key={i} style={styles.carouselItem}>
                  {item.image && (
                    <Image source={item.image} style={styles.carouselImage} />
                  )}
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                  <Text style={styles.carouselDescription}>
                    {item.description}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  detailSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
    marginTop: 10,
  },
  detailPoint: {
    fontSize: 16,
    color: "#555",
    marginLeft: 10,
    marginVertical: 4,
  },
  carouselContainer: {
    marginTop: 16,
    flexDirection: "row",
  },
  carouselItem: {
    width: screenWidth * 0.7,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  carouselImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  carouselDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },
});

export default Postpartum;
