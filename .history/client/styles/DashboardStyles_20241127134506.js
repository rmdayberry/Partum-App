import { StyleSheet } from "react-native";
import { Color, Border, FontSize, FontFamily } from "./GlobalStyles";

const DashboardStyles = StyleSheet.create({
  dashboard: {
    flex: 1,
    maxWidth: "100%",
    width: "100%",
    backgroundColor: Color.nEW,
    borderRadius: Border.br_3xs,
  },
  containerBorder: {
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
  },
  containerFlexbox: {
    textAlign: "center",
    position: "absolute",
  },
  riverlandIcon: {
    width: 66,
    height: 55,
    left: 65,
    top: 49,
    position: "absolute",
  },
  header: {
    width: 375,
    height: 123,
    overflow: "hidden",
    backgroundColor: Color.graysWhite,
    left: 0,
    top: 0,
    position: "absolute",
  },
  partum: {
    top: 62,
    left: 131,
    fontSize: FontSize.size_5xl,
    width: 127,
    height: 29,
    color: Color.colorDarkslateblue_200,
    fontFamily: FontFamily.monstserratBold,
    fontWeight: "700",
  },
  frame: {
    top: 129,
    width: 362,
    left: 0,
  },
  frameLayout1: {
    height: 272,
    overflow: "hidden",
    position: "absolute",
  },
  pregnancyOverviewContainer: {
    width: 349,
    borderRadius: Border.br_2xs,
    left: 13,
    backgroundColor: Color.graysWhite,
    top: 0,
    borderWidth: 1,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
  },
  pregnancyOverview: {
    top: 31,
    left: 93,
    color: "#696969",
    height: 17,
    width: 162,
    fontFamily: FontFamily.monstserratBold,
    fontWeight: "700",
    position: "absolute",
  },
  pregnancyTypo: {
    fontSize: FontSize.size_xs,
    textAlign: "center",
  },
  frame1: {
    top: 418,
    width: 168,
    height: 25,
    overflow: "hidden",
    left: 0,
    position: "absolute",
  },
  apptHead: {
    left: 51,
    width: 117,
    height: 25,
    top: 0,
    position: "absolute",
  },
  upcomingAppointments: {
    fontFamily: FontFamily.arialBlack,
    width: 88,
    left: "30%",
    position: "absolute",
    color: Color.colorDarkslateblue_200,
    top: 0,
  },
  upcomingAppointmentsTypo: {
    textAlign: "left",
    fontSize: FontSize.size_3xs,
  },
  calIcon: {
    height: "83.94%",
    width: "17.86%",
    top: "16.06%",
    right: "82.14%",
    bottom: "0%",
    maxHeight: "100%",
    overflow: "hidden",
    maxWidth: "100%",
  },
  calIconPosition: {
    left: "0%",
    position: "absolute",
  },
  frame2: {
    top: 458,
    width: 194,
    left: 0,
    position: "absolute",
  },
  frame2Layout: {
    height: 194,
    overflow: "hidden",
  },
  appointmentContainer: {
    height: 194,
    overflow: "hidden",
    width: 162,
    borderRadius: Border.br_xs,
    backgroundColor: Color.graysWhite,
    borderWith: 1,
    borderColor: Color.colorGray_100,
    borderStyle: "solid",
  },
  appointmentContainerPosition: {
    left: 32,
    top: 0,
    position: "absolute",
  },
  apptDateTime: {
    left: 21,
    fontSize: 13,
    width: 120,
    height: 30,
    fontFamily: FontFamily.arial,
    top: 50,
    color: Color.colorBlack,
    textAlign: "center",
    position: "absolute",
  },
  clinicLocation: {
    top: 88,
    left: 15,
    width: 130,
    height: 25,
    position: "absolute",
  },
  clinicName: {
    fontWeight: "500",
    fontFamily: FontFamily.monstserratMedium,
    width: 113,
    textDecoration: "underline",
    textAlign: "left",
    fontSize: FontSize.size_3xs,
    height: 25,
    color: Color.colorBlack,
  },
  locationIcon: {
    width: 12,
    height: 12,
    overflow: "hidden",
    left: 0,
  },
  appointmentUnknown: {
    top: 4,
    postion: "absolute",
  },
  daysCountdownContainer: {
    top: 13,
    left: 35,
    fontSize: FontSize.size_lg,
    display: "flex",
    alignItems: "center",
    width: 87,
  },
  daysCountdownContainer2: {
    width: "100%",
  },
  daysNumber: {
    color: Color.colorDarkslateblue_200,
  },
  in: {
    fontFamily: FontFamily.arial,
  },
  text: {
    fontWeight: "700",
  },
  text2: {
    color: "#b5448a",
  },
  daysText: {
    fontFamily: FontFamily.arial,
    color: Color.colorDarkslateblue_200,
  },
  apptNotesBtn: {
    top: 167,
    left: 46,
    backgroundColor: "#adabab",
    width: 70,
    borderRadius: Border.br_8xs,
    height: 16,
    position: "absolute",
  },
  appointmentNotes: {
    color: Color.nEW,
    marginLeft: 7,
    width: 65,
    height: 7,
    fontSize: FontSize.size_7xs,
    top: 4,
    fontFamily: FontFamily.arial,
    textAlign: "left",
    fontWeight: "700",
    position: "absolute",
  },
  needARideContainer: {
    left: 53,
    top: 123,
    position: "absolute",
  },
  needARide: {
    color: "#3f80ff",
    width: 50,
    fontSize: FontSize.size_5xs,
    textDecoration: "underline",
  },
  needARideTypo: {
    height: 11,
    fontFamily: FontFamily.arial,
    textAlign: "center",
  },
});

export default DashboardStyles;
