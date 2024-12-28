import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
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
        title: "Pain Medication",
        details: [
          {
            subtitle: "Vaginal Birth",
            points: [
              "Take 600mg ibuprofen (Motrin) every 6-8 hours as needed for pain.",
              "Alternate ibuprofen with 650mg acetaminophen (Tylenol) every 3-4 hours if pain persists.",
            ],
          },
          {
            subtitle: "Cesarean Birth or Tubal Ligation",
            points: [
              "Use ibuprofen and acetaminophen as first-choice pain relievers.",
              "If pain persists, add 1-2 oxycodone pills every 4 hours as prescribed.",
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
            title: "Soothing Padcicles",
            description:
              "Use witch hazel, aloe vera, and pads to make soothing 'padcicles'.",
            image: null, // Placeholder for padcicle graphic
          },
        ],
      },
      {
        title: "Caring for Your Incision",
        details: [
          "Bathe normally, letting water run over the incision area.",
          "Keep the area dry with a cool blow dryer or a clean sanitary pad.",
          "Sterile strips or glue can fall off after a week. Gently remove them if needed.",
        ],
      },
      {
        title: "Danger Signs & Symptoms",
        details: [
          "Pain worsening instead of improving.",
          "Heavy bleeding or passing a clot larger than a mandarin orange.",
          "Fever >100.4°F for you or your baby.",
        ],
        highlight: true, // Marks this section for distinct styling
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
        <View
          key={index}
          style={[styles.section, section.highlight && styles.highlightSection]}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>

          {/* Details or Carousel */}
          {section.details && (
            <View>
              {section.details.map((detail, i) =>
                typeof detail === "string" ? (
                  <Text key={i} style={styles.sectionDetail}>
                    {detail}
                  </Text>
                ) : (
                  <View key={i}>
                    <Text style={styles.detailSubtitle}>{detail.subtitle}</Text>
                    {detail.points.map((point, j) => (
                      <Text key={j} style={styles.detailPoint}>
                        • {point}
                      </Text>
                    ))}
                  </View>
                )
              )}
            </View>
          )}

          {section.carouselItems && (
            <Carousel
              loop
              width={screenWidth}
              height={200}
              data={section.carouselItems}
              renderItem={({ item }) => (
                <View style={styles.carouselItem}>
                  {item.image && (
                    <Image source={item.image} style={styles.carouselImage} />
                  )}
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                  <Text style={styles.carouselDescription}>
                    {item.description}
                  </Text>
                </View>
              )}
              autoPlay
              autoPlayInterval={3000}
            />
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200EE",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginVertical: 10,
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  highlightSection: {
    backgroundColor: "#fee2e2",
    borderColor: "#f87171",
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionDetail: {
    fontSize: 16,
    color: "#555",
    marginVertical: 4,
  },
  detailSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#333",
  },
  detailPoint: {
    fontSize: 16,
    color: "#555",
    paddingLeft: 10,
    marginVertical: 2,
  },
  carouselItem: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  carouselImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  carouselDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default Postpartum;
