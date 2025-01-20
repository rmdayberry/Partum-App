import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import Header  from "../components/Header";
import {FontSize,
  FontFamily,
  Color,
  Gap,
  Padding,
  Border,} from "../GlobalStyles";

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
    backgroundColor: Color.nEW,
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 50, //Space for scrolling content
  },
  header: {
    width:"100%",
    flexDirection:"row",
    justifyContent: "center",
    padding:16,
    backgroundColor: Color.graysWhite,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorGray_100,
  },
riverland1Icon: {
width:67,
height:56,
},
partum: {
  fontSize:FontSize.size_5xl,
  fontWeight: '700',
  fontFamily: FontFamily.montserrat,
  color: Color.colorDarkslateblue_200,
},
pregnancyOverviewContainer: {
  width: "90%",
  backgroundColor: Color.graysWhite,
  borderRadius: Border.br_xs,
  borderColor: Color.colorGray_100
},
frame1: {
  alignItems: "center",
  marginBottom: 16,
  marginHorizontal: 20,
},

pregnancyOverview: {
  fontSize: FontSize.size_xs,
  fontWeight: "700",
  FontFamily: FontFamily.montserrat,
  color: "#696969",
  textAlign: "center",
  marginBottom: 20,
},

  
});

export default Dashboard;
