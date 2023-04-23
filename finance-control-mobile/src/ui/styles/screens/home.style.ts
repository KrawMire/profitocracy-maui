import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const homeScreenStyles = StyleSheet.create({
  scrollWrapper: {
    height: "100%"
  },
  wrapper: {
    height: "100%",
    paddingTop: 50,
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  sectionHeader: {
    marginTop: 10,
    marginBottom: 5,
  },
  amountWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  balanceCard: {
    marginTop: 10,
  },
  infoCard: {
    marginRight: 10,
    width: screenWidth * 0.9,
  },
  categoriesWrapper: {
  },
  categoriesLineWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  categoryCard: {
    width: "49%"
  },
  noCategoriesWrapper: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  noCategoriesHint: {
    width: "85%",
    textAlign: "center",
    marginTop: 30
  },
  dailyCashWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  dailyCashCard: {
    width: "45%"
  }
});