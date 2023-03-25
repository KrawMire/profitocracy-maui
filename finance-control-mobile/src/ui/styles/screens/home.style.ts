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

  amountWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  },

  balanceCard: {
    marginVertical: 10,
  },
  infoCard: {
    marginVertical: 10,
    marginRight: 10,
    width: screenWidth * 0.9,
  },

  categoriesWrapper: {
    marginTop: 10,
  },
  categoriesLineWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  categoryCard: {
    width: "49%"
  },

  dailyCashWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  dailyCashCard: {
    width: "45%"
  }
});