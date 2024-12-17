import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { FontSize, FontFamily, Color, Border } from "../../GlobalStyles";

const topicImages = {
  sleep: require("../../assets/SleepWG.png"),
  nutrition: require("../../assets/NutritionWG.png"),
  mentalHealth: require("../../assets/MentalHealthWG.png"),
  exercise: require("../../assets/ExerciseWG.png"),
  symptoms: require("../../assets/SymptomsWG.png"),
};

const FirstTrimester = () => {
  const [activeTab, setActiveTab] = useState("sleep");

  const renderContent = () => {
    switch (activeTab) {
      case "sleep":
        return (
          <ScrollView
            contentContainerStyle={styles.scene}
            showsVerticalScrollIndicator={false}
          >
            <Image source={topicImages.sleep} style={styles.image} />
            <Text style={styles.tabHeading}>
              Sleep During Your First Trimester
            </Text>
            <Text style={styles.content}>
              The early part of pregnancy can be exhausting, and that’s
              completely normal! Your body is working hard to grow your baby,
              and it’s no surprise that you might feel tired all the time.
              Getting enough rest is essential for both your health and your
              baby’s development.
            </Text>

            <Text style={styles.subheading}>What You Can Do:</Text>
            <Text style={styles.bulletPoint}>
              • Aim for at least 8 hours of sleep each night. If you feel like
              you need more, that’s okay! Listen to your body and rest when you
              can.
            </Text>
            <Text style={styles.bulletPoint}>
              • Take naps if needed. Short naps during the day can help recharge
              your energy. Just try not to nap too much or too late in the day.
            </Text>
            <Text style={styles.bulletPoint}>
              • Adjust your schedule if you work at night to ensure you’re
              getting enough rest during the day.
            </Text>
            <Text style={styles.bulletPoint}>
              • Let go of unnecessary stress. Focus on what’s truly essential
              and put overwhelming tasks on hold.
            </Text>
            <Text style={styles.bulletPoint}>
              • Seek help if you’re struggling with insomnia or sleep quality.
              Safe medication or other strategies can be discussed with your
              provider.
            </Text>

            <Text style={styles.subheading}>The Importance of Sleep:</Text>
            <Text style={styles.content}>
              Sleep deprivation can affect your mood, energy levels, and overall
              well-being. It’s also essential for your body’s ability to
              function at its best during pregnancy. If you’re having trouble
              sleeping, don’t hesitate to reach out for support—we’re here to
              help!
            </Text>

            <Text style={styles.subheading}>Quick Tips for Better Sleep:</Text>
            <Text style={styles.bulletPoint}>
              • Create a calming bedtime routine: Read, listen to soft music, or
              meditate before bed.
            </Text>
            <Text style={styles.bulletPoint}>
              • Make your sleep space comfortable: Keep the room dark, quiet,
              and cool. A pregnancy pillow can provide extra support.
            </Text>
            <Text style={styles.bulletPoint}>
              • Limit screen time: Avoid phones, tablets, or TVs at least 30
              minutes before bed to help your mind wind down.
            </Text>
          </ScrollView>
        );

      case "nutrition":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.nutrition} style={styles.image} />
            <Text style={styles.tabHeading}>Nutrition</Text>
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
      case "mentalHealth":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.mentalHealth} style={styles.image} />
            <Text style={styles.tabHeading}>Mental Health</Text>
            <Text style={styles.content}>
              Practice mindfulness and deep breathing.
            </Text>
            <Text style={styles.content}>
              Seek support from friends and family.
            </Text>
            <Text style={styles.content}>
              Consider joining a prenatal support group.
            </Text>
            <Text style={styles.content}>
              Speak with a counselor if needed.
            </Text>
          </View>
        );
      case "exercise":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.exercise} style={styles.image} />
            <Text style={styles.tabHeading}>Exercise</Text>
            <Text style={styles.content}>
              Engage in light activities like walking.
            </Text>
            <Text style={styles.content}>Avoid high-impact exercises.</Text>
            <Text style={styles.content}>
              Prenatal yoga can help reduce stress.
            </Text>
            <Text style={styles.content}>Stay hydrated during workouts.</Text>
          </View>
        );
      case "symptoms":
        return (
          <View style={styles.scene}>
            <Image source={topicImages.symptoms} style={styles.image} />
            <Text style={styles.tabHeading}>Symptoms to Look Out For</Text>
            <Text style={styles.content}>
              Contact your doctor for severe cramping.
            </Text>
            <Text style={styles.content}>
              Heavy bleeding is a warning sign.
            </Text>
            <Text style={styles.content}>
              Persistent dizziness requires attention.
            </Text>
            <Text style={styles.content}>
              Unusual pain should not be ignored.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.introWrapper}>
        <Text style={styles.introHeading}>Your first trimester is an exciting time!
      </Text>
      <Text style={styles.introText}>
        Let this page guide you with evidence-based advice for a healthy and happy start to your journey.
      </Text>
      </View>
        {/* Scrollable Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBar}
        >
          {[
            { key: "sleep", label: "Sleep" },
            { key: "nutrition", label: "Nutrition" },
            { key: "mentalHealth", label: "Mental Health" },
            { key: "exercise", label: "Exercise" },
            { key: "symptoms", label: "Symptoms" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tabButton,
                activeTab === tab.key && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* Tab Content */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabBarWrapper: {
    height: 50,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
    color: "#898989",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFC107",
  },
  activeText: {
    fontWeight: "bold",
    color: "#FFC107",
  },
  scene: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
  },
  tabHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6200EE",
  },
  content: {
    fontSize: 16,
    marginVertical: 4,
    textAlign: "center",
    color: "#333",
  },
  image: {
    width: "80%",
    height: 150,
    marginBottom: 16,
    borderRadius: 8,
    resizeMode: "contain",
  },
  subheading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#6200EE",
    textAlign: "center",
  },
  bulletPoint: {
    fontSize: 16,
    marginVertical: 4,
    color: "#333",
    textAlign: "left",
    lineHeight: 22,
  },
});

export default FirstTrimester;
