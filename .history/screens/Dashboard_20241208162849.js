import React, {useState, useEffect} from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Header  from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import AppointmentContainer from "../components/AppointmentContainer";
import {fetchPregnancyProgress, fetchWeeklyTip} from "../api/api";
import {FontSize,
  FontFamily,
  Color,
  Gap,
  Padding,
  Border,} from "../GlobalStyles";

const Dashboard = () => {
  const navigation = useNavigation();
  const [currentWeek, setCurrentWeek] = useState(null);
  const [weeklyTip, setWeeklyTip] = useState(null);
  const [loadingTip, setLoadingTip]= useState(true);

  const userId = "6751f6871fb757c8ce3efb3d" //test user from database

  useEffect(()=>{
    const fetchProgressAndTip = async ()=> {
      try{
        //fetch progress and calculate current week
        const progress = await fetchPregnancyProgress(userId);
        const week = Math.floor((progress / 100) * 40); // Convert progress % to week
        setCurrentWeek(week);

        //Fetch weekly tip
        const tipData = await fetchWeeklyTip(week);
        setWeeklyTip(tipData);
      } catch(error){
        console.error("Error fetching weekly data:", error);
      } finally {
        setLoadingTip(false);
      }
    };

    fetchProgressAndTip();
  }, []);

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
          <Text style={styles.youre}>You're </Text>
          <Text style={styles.x}>{currentWeek} </Text>
          <Text style= {styles.youre}>Weeks Along!</Text>
        </Text>

        <ProgressBar userId={"6751f6871fb757c8ce3efb3d"} />
        {/* Weekly Tip */ }
        <View style= {styles.weeklyTipContainer}/>
        <Text style={styles.tipHeader}>What you can expect this week:</Text>
        {loadingTip ? (
          <Text>Loading...</Text>
        ) : weeklyTip ? (
          <>
          <Text style = {styles.tipText}>{weeklyTip.tip}</Text>
          </>
        ) : (
          <Text>No tip available for this week.</Text>
        )}
      </View>
    </View>
    {/* Appointment Container */}
    <View style={styles.appointmentSection}>

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
    alignItems: "center",
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
  borderColor: Color.colorGray_100,
  borderWidth: 1,
  padding: 16,
  marginTop: 20,
},
frame1: {
  alignItems: "center",
  marginBottom: 16,
  marginHorizontal: 20,
},

pregnancyOverview: {
  fontSize: FontSize.size_xs,
  fontWeight: "700",
  fontFamily: FontFamily.montserrat,
  color: "#696969",
  textAlign: "center",
  marginBottom: 20,
},
youreXWeeksContainer:{
  fontSize: FontSize.m3BodyLarge_size,
  fontFamily: FontFamily.montserrat,
    textAlign: "center",
},
weeklyTipContainer: {
  marginTop: 0,
  marginHorizontal: 10,
  padding: 8,
  alignItems: "center",
},
tipHeader: {
  fontSize: FontSize.size_lg,
  fontWeight: "bold",
  marginBottom: 10,
  textAlign: "center",
  color: "#727272",
},
tipText: {
  fontSize: FontSize.m3LabelLarge_size,
  fontFamily: FontFamily.montserrat,
  textAlign: "center",
  marginHorizontal: 20,
},
youre:{
  fontFamily: FontFamily.montserrat, 
  fontSize: 16,
},
x:{
  fontFamily: FontFamily.montserrat, 
  fontSize: 16,
}
  
});

export default Dashboard;
