import { Button, Input, Layout, Text } from "@ui-kitten/components";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useDispatch, useSelector } from "react-redux";

import AppState from "src/domain/app-state/app-state";
import { setBillingPeriod } from "state/app-settings/actions";
import { isNullOrZero } from "utils/null-check";

export function BillingPeriodsSettings() {
  const dispatch = useDispatch();
  const startDay = useSelector((state: AppState) => state.settings.settings.billingPeriodSettings.dateFrom);
  const endDay = useSelector((state: AppState) => state.settings.settings.billingPeriodSettings.dateTo);

  const [startDayInput, setStartDayInput] = useState("");
  const [endDayInput, setEndDayInput] = useState("");

  const isBillingPeriodSet = !isNullOrZero(startDay) && !isNullOrZero(endDay);

  const onSetBillingPeriod = () => {
    const numStart = Number(startDayInput);
    const numEnd = Number(endDayInput);

    if (!numStart || !numEnd) {
      showMessage({
        message: "Billing period dates are invalid!",
        position: "top",
        type: "danger"
      })
      return;
    }

    dispatch(setBillingPeriod(numStart, numEnd));
  }

  return (
    <Layout>
      {isBillingPeriodSet ? (
        <Layout>
          <Text>Start date: {startDay}</Text>
          <Text>End date: {endDay}</Text>
        </Layout>
      ) : (
        <Layout>
          <Input
            placeholder="Enter start day of month..."
            onChangeText={setStartDayInput}
            keyboardType="numeric"
          />
          <Input
            placeholder="Enter end day of month..."
            onChangeText={setEndDayInput}
            keyboardType="numeric"
          />
        </Layout>
      )}
      <Button onPress={onSetBillingPeriod}>
        Set billing period
      </Button>
    </Layout>
  )
}