import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

export function SettingsScreen() {
  const [showPeriodDatePicker, setShowPeriodDatePicker] = useState(false);
  const [periodEndDate, setPeriodEndDate] = useState<Date | null | undefined>(null);
  const [pickedEndDate, setPickedEndDate] = useState<Date>(new Date(Date.now()))

  const handleChangePeriodEndDate = (event: DateTimePickerEvent, value?: Date) => {
    setPeriodEndDate(value);
    setPickedEndDate(value ?? new Date(Date.now()));
    setShowPeriodDatePicker(false);
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
    paddingBottom: 30
  },
  periodBlockText: {
    color: "#4F4F4F",
  },
  specifyButton: {
    backgroundColor: "#000000",
    width: "100%",
    bottom: 34,
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
  }
});