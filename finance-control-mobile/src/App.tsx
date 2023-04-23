import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import FlashMessage from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";

import AppState from "./domain/app-state/app-state";
import ThemeSettings from "./domain/app-settings/components/theme-settings";
import { HomeScreen } from "screens/home-screen/home-screen";
import { NavigationContainer } from "@react-navigation/native";
import { SettingsScreen } from "screens/settings-screen/settings-screen";
import { AddTransactionScreen } from "screens/add-transaction-screen/add-transaction-screen";
import { TransactionsHistoryScreen } from "screens/transactions-history-screen/transactions-history-screen";
import { useSelector } from "react-redux";
import { SetUpScreen } from "screens/set-up-screen/set-up-screen";

const themeRegistry = {
  [ThemeSettings.Light]: {
    appTheme: eva.light,
    tabIconsColor: "#2b2b2b",
  },
  [ThemeSettings.Dark]: {
    appTheme: eva.dark,
    tabIconsColor: "#b8b8b8",
  },

  // TODO: Create system theme
  [ThemeSettings.System]: {
    appTheme: eva.light,
    tabIconsColor: "",
  },
};

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  const themeState = useSelector((state: AppState) => state.settings.settings.themeSettings);

  const iconsColor = themeRegistry[themeState].tabIconsColor;

  return (
    <BottomNavigation selectedIndex={state.index} onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab icon={<Ionicons name="home-outline" size={22} color={iconsColor} />} />
      <BottomNavigationTab icon={<Ionicons name="add-circle-outline" size={22} color={iconsColor} />} />
      <BottomNavigationTab icon={<Ionicons name="settings-outline" size={22} color={iconsColor} />} />
      <BottomNavigationTab icon={<Ionicons name="cash-outline" size={22} color={iconsColor} />} />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
    <Screen name="add-transaction" component={AddTransactionScreen} options={{ headerShown: false }} />
    <Screen name="settings" component={SettingsScreen} options={{ headerShown: false }} />
    <Screen name="transactions-history" component={TransactionsHistoryScreen} options={{ headerShown: false }} />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default function App() {
  const themeState = useSelector((state: AppState) => state.settings.settings.themeSettings);
  const isAppSetUp = useSelector((state: AppState) => state.globalState.isSetUp);

  return (
    <ApplicationProvider {...eva} theme={themeRegistry[themeState].appTheme}>
      <FlashMessage position="top" />
      {isAppSetUp ? <AppNavigator /> : <SetUpScreen />}
    </ApplicationProvider>
  );
}
