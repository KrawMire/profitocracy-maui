import { useState } from "react";
import { Button, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector, useStore } from "react-redux";
import AppState from "src/domain/app-state/app-state";
import { setBillingPeriod } from "state/app-settings/actions";
import { resetStore } from "state/store/actions";
import { settingsScreenStyles } from "styles/screens/settings.style";
import { isNullOrZero } from "utils/null-check";

export function SettingsScreen() {
  const startDay = useSelector((state: AppState) => state.settings.settings.billingPeriodSettings.dateFrom);
  const endDay = useSelector((state: AppState) => state.settings.settings.billingPeriodSettings.dateTo);
  const dispatch = useDispatch();

  const [startDayInput, setStartDayInput] = useState("");
  const [endDayInput, setEndDayInput] = useState("");

  const isBillingPeriodSet = !isNullOrZero(startDay) && !isNullOrZero(endDay);

  const onSetBillingPeriod = () => {
    const numStart = Number(startDayInput);
    const numEnd = Number(endDayInput);

    if (!numStart || !numEnd) {
      // TODO: Create parsing error message
      // It would be nice if it will be popup message
      return;
    }

    dispatch(setBillingPeriod(numStart, numEnd));
  }

  const onResetApp = () => {
    dispatch(resetStore());
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={settingsScreenStyles.wrapper}>
        <Text>Settings</Text>
        <Text>Billing periods</Text>
        {isBillingPeriodSet ? (
          <View>
            <Text>Start date: {startDay}</Text>
            <Text>End date: {endDay}</Text>
          </View>
        ) : (
          <View>
            <TextInput
              placeholder="Enter start day of month..."
              onChangeText={setStartDayInput}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Enter end day of month..."
              onChangeText={setEndDayInput}
              keyboardType="numeric"
            />
          </View>
        )}
        <Button title="Set billing period" onPress={onSetBillingPeriod} />
        <Button title="Reset app" onPress={onResetApp} />
      </View>
    </TouchableWithoutFeedback>
  )
}