import { Text, View } from "react-native";
import { useSelector } from "react-redux";

import { homeScreenStyles } from "styles/screens/home.style";
import AppState from "src/domain/app-state/app-state";

export function HomeScreen() {
  const totalBalance = useSelector((state: AppState) => state.totalBalance);
  const expenses = useSelector((state: AppState) => state.expenses.expenses);

  return (
    <View style={homeScreenStyles.wrapper}>
      <Text>Home</Text>
      <Text>Total balance is: {totalBalance.actualBalance}</Text>
      <Text></Text>
    </View>
  )
}