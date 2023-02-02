import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import AppState from "src/domain/app-state/app-state";
import { setInitialBalance } from "state/total-balance/actions";
import { sharedTextStyle } from "styles/shared/text.style";

export function TotalBalanceSettings() {
  const dispatch = useDispatch();
  const totalBalance = useSelector((state: AppState) => state.totalBalance.initialBalance);

  const [totalBalanceValue, setTotalBalanceValue] = useState(totalBalance?.toString());

  const onSetTotalBalance = () => {
    const newTotalBalance = Number(totalBalanceValue);

    if (!newTotalBalance) {
      // TODO: Show some alert message
      console.log("New total balance value is invalid!");
      return
    }

    dispatch(setInitialBalance(newTotalBalance));
  }

  return (
    <View>
       <Text style={sharedTextStyle.sectionTitle}>Total balance</Text>
          <TextInput
            placeholder="Enter new initial total balance..."
            onChangeText={setTotalBalanceValue}
            keyboardType="numeric"
            value={totalBalanceValue?.toString()}
          />
          <Button
            title="Set total balance"
            onPress={onSetTotalBalance}
          />
    </View>
  )
}