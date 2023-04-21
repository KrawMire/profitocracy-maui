import { Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
import { useDispatch } from "react-redux";

import { AppThemeSettings } from "components/settings-screen/app-theme-settings";
import { resetStore } from "state/global/actions";
import { settingsScreenStyles } from "styles/screens/settings.style";
import { ExpensesCategoriesSettings } from "components/settings-screen/expenses-categories-settings";
import { Button, Card, Layout, Text } from "@ui-kitten/components";

export function SettingsScreen() {
  const dispatch = useDispatch();

  const onResetApp = () => {
    dispatch(resetStore());
  };

  const renderHeader = (header: string) => <Text category="h5">{header}</Text>;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout style={settingsScreenStyles.wrapper} level="4">
        <ScrollView>
          <Text category="h1">Settings</Text>
          <Card header={renderHeader("App theme")} style={settingsScreenStyles.settingsCard}>
            <AppThemeSettings />
          </Card>
          <Card header={renderHeader("Expense categories")} style={settingsScreenStyles.settingsCard}>
            <ExpensesCategoriesSettings />
          </Card>
          <Button onPress={onResetApp} status="danger" style={settingsScreenStyles.resetAppButton}>
            Reset app
          </Button>
        </ScrollView>
      </Layout>
    </TouchableWithoutFeedback>
  );
}
