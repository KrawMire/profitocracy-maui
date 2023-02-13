import { StyleSheet } from "react-native";

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
  infoCard: {
    marginTop: 10,
    marginBottom: 10,
  },
  categoriesWrapper: {
  },
  categoriesLineWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  dailyCashWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  dailyCashCard: {
    width: "45%"
  }
});