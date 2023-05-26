import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { ThemeSettings } from "domain/settings";

const screenWidth = Dimensions.get("window").width;
const colors = {
  sumTextColorLight: "#dcdcdc",
  sumTextColorDark: "#2d2d2d",
  subheaderTextColor: "#a1a1a1",
};

export function getHomeScreenStyle(theme: ThemeSettings) {
  const sumTextColor = theme === ThemeSettings.Dark ? colors.sumTextColorLight : colors.sumTextColorDark;

  return StyleSheet.create({
    amountWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
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
    savedAmountWrapper: {
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    scrollWrapper: {
      height: "100%",
    },
    sectionHeader: {
      marginBottom: 15,
      marginTop: 20,
    },
    spendTypesScrollWrapper: {
      marginBottom: 25,
    },
    subheaderText: {
      color: colors.subheaderTextColor,
    },
    sumText: {
      color: sumTextColor,
      fontWeight: "800",
    },
    wrapper: {
      height: "100%",
      paddingLeft: "2%",
      paddingRight: "2%",
      paddingTop: 50,
    },
  });
}
