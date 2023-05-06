import { StyleSheet } from "react-native";

export const addTransactionScreenStyles = StyleSheet.create({
  addButton: {
    marginTop: 10,
  },
  amountInput: {
    width: "70%",
  },
  amountWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  categorySelect: {
    width: "70%",
  },
  categorySelectWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  clearCategorySelectButton: {
    width: "28%",
  },
  currencySelect: {
    width: "28%",
  },
  descriptionInput: {
    marginTop: 10,
  },
  transactionFormWrapper: {
    marginTop: 20,
  },
  typeButton: {
    width: "33%",
  },
  typeButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  wrapper: {
    height: "100%",
    paddingLeft: "2%",
    paddingRight: "2%",
    paddingTop: 50,
  },
});
