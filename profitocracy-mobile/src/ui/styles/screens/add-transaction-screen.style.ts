import { StyleSheet } from "react-native";

const colors = {
  amountSign: "#3f3f3f",
};

export const addTransactionScreenStyles = StyleSheet.create({
  addButton: {
    marginTop: 10,
  },
  amountInput: {
    width: "65%",
  },
  amountSign: {
    color: colors.amountSign,
    fontSize: 30,
    fontWeight: "500",
  },
  amountWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
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
  incomeExpenseButton: {
    width: "45%",
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
