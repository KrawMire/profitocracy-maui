import { Text, View } from "react-native";
import { settingsScreenStyles } from "styles/screens/settings.style";

export function SettingsScreen() {
  return (
    <View style={settingsScreenStyles.wrapper}>
      <Text>Settings</Text>
    </View>
  )
}