import { StyleSheet } from "react-native";

const $modalBackdropColor = "#0000007F";

export const settingsScreenStyles = StyleSheet.create({
  addCategoryModalBackdrop: {
    backgroundColor: $modalBackdropColor,
  },
  resetAppButton: {
    marginTop: 25,
  },
  settingsCard: {
    marginBottom: 10,
  },
  totalBalanceSettingsCard: {
    marginBottom: 10,
    marginTop: 20,
  },
  wrapper: {
    height: "100%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: 50,
  },
});
