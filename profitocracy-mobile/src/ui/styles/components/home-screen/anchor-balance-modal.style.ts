import { StyleSheet } from "react-native";

const $modalBackdropColor = "#0000007F";

export const anchorBalanceModalStyle = StyleSheet.create({
  balanceInput: {
    marginTop: 15,
  },
  balanceModal: {
    width: "90%",
  },
  balanceModalBackdrop: {
    backgroundColor: $modalBackdropColor,
  },
  confirmButton: {
    marginTop: 20,
  },
  fromPreviousButton: {
    marginTop: 20,
  },
  questionText: {
    fontSize: 17,
    lineHeight: 25,
    marginLeft: "10%",
    textAlign: "center",
    width: "80%",
  },
});
