import { StyleSheet } from "react-native";

export const addTransactionScreenStyles = StyleSheet.create({
  wrapper: {
    height: "100%",
    paddingTop: 50,
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  transactionFormWrapper: {
    marginTop: 20,
  },
  amountWrapper: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  amountInput: {
    width: "70%"
  },
  currencySelect: {
    width: "28%"
  },
  typeButtonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  descriptionInput: {
    marginTop: 10,
  },
  categorySelectWrapper: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  categorySelect: {
    width: "70%"
  },
  clearCategorySelectButton: {
    width: "28%"
  },
  addButton: {
    marginTop: 10
  }
});