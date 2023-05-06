import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export const homeScreenStyles = StyleSheet.create({
  amountWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  balanceCard: {
    marginTop: 10,
  },
  categoriesLineWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  categoriesWrapper: {},
  categoryCard: {
    width: "49%",
  },
  dailyCashCard: {
    width: "45%",
  },
  dailyCashWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  infoCard: {
    marginRight: 10,
    width: screenWidth * 0.9,
  },
  noCategoriesHint: {
    marginTop: 30,
    textAlign: "center",
    width: "85%",
  },
  noCategoriesWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  scrollWrapper: {
    height: "100%",
  },
  sectionHeader: {
    marginBottom: 5,
    marginTop: 10,
  },
  wrapper: {
    height: "100%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: 50,
  },
});
