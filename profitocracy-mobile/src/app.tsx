import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import FlashMessage from "react-native-flash-message";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

import { AppState } from "state/app-state";
import { ThemeSettings } from "domain/settings";

import { HomeScreen } from "screens/home-screen";
import { SettingsScreen } from "screens/settings-screen";
import { AddTransactionScreen } from "screens/add-transaction-screen";
import { TransactionsScreen } from "screens/transactions-screen";
import { SetUpScreen } from "screens/set-up-screen";

const themeRegistry = {
  [ThemeSettings.Light]: {
    appTheme: eva.light,
    tabIconsColor: "#2b2b2b",
  },
  [ThemeSettings.Dark]: {
    appTheme: eva.dark,
    tabIconsColor: "#b8b8b8",
  },
};

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  const themeState = useSelector((state: AppState) => state.settings.theme);

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
    <Screen name="transactions-history" component={TransactionsScreen} options={{ headerShown: false }} />
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);

export default function App() {
  const themeState = useSelector((state: AppState) => state.settings.theme);
  const isAppSetUp = useSelector((state: AppState) => state.settings.isSetUp);

  return (
    <ApplicationProvider {...eva} theme={themeRegistry[themeState].appTheme}>
      <FlashMessage position="top" />
      {isAppSetUp ? <AppNavigator /> : <SetUpScreen />}
    </ApplicationProvider>
  );
}
