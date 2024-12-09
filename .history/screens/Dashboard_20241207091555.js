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
  </ScrollView>
  );
};


const styles= StyleSheet.create({
  
});

export default Dashboard;
