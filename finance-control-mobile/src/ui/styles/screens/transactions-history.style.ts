import { StyleSheet } from "react-native";

const $modalBackdropColor = "#0000007F";

export const transactionsHistoryScreenStyles = StyleSheet.create({
  clearButton: {
    marginTop: 10,
  },
  clearModalBackdrop: {
    backgroundColor: $modalBackdropColor,
  },
  transactionsListWrapper: {
    marginTop: 10,
  },
  wrapper: {
    height: "100%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: 50,
  },
});
