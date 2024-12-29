import React, { useState, useEffect, useContext } from "react";

import {
  ScrollView,
  View,
  Text,
  Stylesheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const { width: screenWidth } = Dimensions.get("window");

//Placeholder images
const graphics = {
  periBottle: require("../../assets/graphic_periBottle.png"),
  incisionCare: require("../../assets/graphic_incisionCare.png"),
  recoveryTips: require("../../assets/graphic_recoveryTips.png"),
};

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
        const preferredLanguage = response.languagePreference || "English";
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
    </ScrollView>
  );
};
export default Postpartum;
