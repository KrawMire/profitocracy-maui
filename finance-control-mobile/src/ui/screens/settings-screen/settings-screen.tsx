import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Divider } from "shared/divider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { AppGlobalState } from "appState/store";
import { TotalState } from "appState/total/types";
import { Dispatch } from "redux";
import { setTotal } from "appState/total/actions";
import { ExpensesState } from "appState/expenses/types";
import Expense from "objectsTypes/expense";
import { specifyExpenses } from "appState/expenses/actions";

interface SettingsScreenProps {
  total: TotalState;
  expenses: ExpensesState;
  onChangeTotal: (total: TotalState, expenses: ExpensesState) => void;
}

function SettingsScreenBase(props: SettingsScreenProps) {
  const [showPeriodDatePicker, setShowPeriodDatePicker] = useState(false);
  const [periodEndDate, setPeriodEndDate] = useState<Date | null | undefined>(null);
  const [pickedEndDate, setPickedEndDate] = useState<Date>(new Date(Date.now()));
  const [periodSum, setPeriodSum] = useState(props.total ?? 0);
  const [canSetSum, setCanSetSum] = useState(!props.total);

  const handleChangePeriodEndDate = (event: DateTimePickerEvent, value?: Date) => {
    const countPeriod = {
      startDate: new Date(Date.now()),
      endDate: value
    };
    AsyncStorage.setItem("COUNT_PERIOD", JSON.stringify(countPeriod))
    .then(() => {
      setPeriodEndDate(value);
      setPickedEndDate(value ?? new Date(Date.now()));
      setShowPeriodDatePicker(false);
    });
  }

  const handleChangePeriodSum = (value: string) => {
    if (value.length === 0) {
      setPeriodSum(0);
      return;
    }

    setPeriodSum(parseFloat(value));
  }

  const handleSetPeriodSum = () => {
    if (!canSetSum) {
      setCanSetSum(true);
      return;
    }

    AsyncStorage.setItem("PERIOD_SUM", periodSum.toString())
    .then(() => {
      if (props.expenses && props.expenses.length >= 4) {
        AsyncStorage.getItem("EXPENSES")
        .then(value => {
          if (value) {
            const expenses = JSON.parse(value) as Expense[];
            const newExpenses = expenses.map(expense => {
              switch (expense.header) {
                case "Daily expenses":
                  return {
                    ...expense,
                    plannedExpenses: Math.round(periodSum / 15)
                  }
                case "Main expenses":
                  return {
                    ...expense,
                    plannedExpenses: Math.round(periodSum * 0.5)
                  }
                case "Secondary expenses":
                  return {
                    ...expense,
                    plannedExpenses: Math.round(periodSum * 0.3)
                  }
                case "Postponed":
                  return {
                    ...expense,
                    plannedExpenses: Math.round(periodSum * 0.2)
                  }
                default:
                  return expense;
              }
            });

            AsyncStorage.setItem("EXPENSES", JSON.stringify(newExpenses)).then(() => {
              props.onChangeTotal(periodSum, newExpenses);
              setCanSetSum(false);
            });
          } else {
            throw Error("Expenses was not specified!");
          }
        });
      } else {
        const expenses: Expense[] = [
          {
            header: "Daily expenses",
            actualExpenses: 0,
            plannedExpenses: Math.round(periodSum / 15),
          },
          {
            header: "Main expenses",
            actualExpenses: 0,
            plannedExpenses: Math.round(periodSum * 0.5),
          },
          {
            header: "Secondary expenses",
            actualExpenses: 0,
            plannedExpenses: Math.round(periodSum * 0.3),
          },
          {
            header: "Postponed",
            actualExpenses: 0,
            plannedExpenses: Math.round(periodSum * 0.2),
          }
        ];

        AsyncStorage.setItem("EXPENSES", JSON.stringify(expenses)).then(() => {
          props.onChangeTotal(periodSum, expenses);
          setCanSetSum(false)
        });
        }
    });
  }

  const handleSpecifyEndDate = () => {
    setShowPeriodDatePicker(true);
  }

  const renderIfCanSpecifyDate = () => {
    return (
      <View>
        <Text>The period is from</Text>
        <DateTimePicker disabled value={new Date(Date.now())}/>
        <Text>to</Text>
        {showPeriodDatePicker ?
        <DateTimePicker
          key="activeDatePicker"
          value={pickedEndDate}
          onChange={handleChangePeriodEndDate}
        /> : <DateTimePicker
          key="disabledDatePicker"
          value={periodEndDate ?? pickedEndDate}
          disabled={true}
        />
        }
      </View>
    )
  }

  const renderIfCannotSpecifyDate = () => {
    return (
      <Text style={styles.periodBlockText}>
        The period ending date was not specified
      </Text>
    )
  }

  const renderDateBlockContent = () => {
    if (periodEndDate) {
      return renderIfCanSpecifyDate();
    } else {
      if (showPeriodDatePicker) {
        return renderIfCanSpecifyDate();
      } else {
        return renderIfCannotSpecifyDate();
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.periodBlock}>
        <View style={styles.messageText}>
          {renderDateBlockContent()}
        </View>
        <TouchableOpacity style={styles.specifyButton} onPress={() => handleSpecifyEndDate()}>
          <LinearGradient colors={['#00A661', '#90FF87']} style={styles.specifyButtonGradient}>
            <Text style={styles.specifyButtonText}>Specify period ending date</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.sumForPeriodBlock}>
        <View style={styles.sumForPeriodCardContent}>
          <Text>Set initial sum for period</Text>
          {canSetSum ? <TextInput style={styles.amountTextInput} value={periodSum.toString()} onChangeText={handleChangePeriodSum} keyboardType="numeric"/> :
          <Text> {periodSum}</Text>}

        </View>
        <TouchableOpacity style={styles.setSumButton} onPress={handleSetPeriodSum}>
          <LinearGradient colors={['#00A661', '#90FF87']} style={styles.specifyButtonGradient}>
            <Text style={styles.specifyButtonText}>Set sum for period</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F4F4F4',
    paddingTop: '10%'
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: "#5B5B5B",
    marginLeft: "5%",
    marginTop: "5%"
  },
  periodBlock: {
    marginTop: 25,
    marginLeft: "5%",
    marginRight: "5%",
    width: '90%',
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,

    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 5,
      width: 0
    },
  },
  messageText: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 30,
    flex: 1,
  },
  periodBlockText: {
    color: "#4F4F4F",
  },
  specifyButton: {
    width: "100%",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  specifyButtonGradient: {
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 10,
  },
  specifyButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 14
  },
  periodDatePicker: {
    fontWeight: '600'
  },
  sumForPeriodBlock: {
    marginTop: 25,
    marginLeft: "5%",
    marginRight: "5%",
    width: '90%',
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 25,

    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: 5,
      width: 0
    },
  },
  sumForPeriodCardContent: {
    height: "100%",
    padding: 15,
    flex: 1,
    flexDirection: "row"
  },
  setSumButton: {
    width: "100%",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  amountTextInput: {
    width: 130,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginLeft: 15
  },
});

const mapStateToProps = (state: AppGlobalState) => ({
  total: state.total,
  expenses: state.expenses
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onChangeTotal: (total: TotalState, expenses: ExpensesState) => {
    dispatch(setTotal(total));
    dispatch(specifyExpenses(expenses));
  }
})

export const SettingsScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreenBase)