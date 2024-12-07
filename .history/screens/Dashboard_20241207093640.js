import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Header  from "../components/Header"

const Dashboard = () => {
  return(
  <ScrollView
    style={styles.dashboard}
    contentContainerStyle={styles.contentContainer}
  >
    {/*Header*/}
    <Header/>

    {/*Pregancy Overview*/}
    <View style={styles.pregnancyOverviewContainer}>
      <View style={styles.frame1}>
        <Text style={styles.pregnancyOverview}>Pregnancy Overview</Text>
        <Text style={styles.youreXWeeksContainer}>
          <Text style={styles.youre}>You're</Text>
          <Text style={styles.x}>X</Text>
          <Text style= {styles.youre}>Weeks Along!</Text>
        </Text>

        {/* Progress Bar */ }
        {/* Weekly Tip */ }
        <View style= {styles.weeklyTipContainer}/>
        <Text style={styles.tipHeader}>What you can expect this week:</Text>
        {/* Tip goes here */}
      </View>
    </View>


  </ScrollView>
  );
};


const styles= StyleSheet.create({
  dashboard:{
    flex: 1,
    backgroundColor: Color.nEw,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 50, //Space for scrolling content
  }
  
});

export default Dashboard;
