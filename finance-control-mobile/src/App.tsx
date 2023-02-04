import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

import * as eva from '@eva-design/eva';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from 'screens/home-screen/home-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SettingsScreen } from 'screens/settings-screen/settings-screen';
import { AddTransactionScreen } from 'screens/add-transaction-screen/add-transaction-screen';
import { TransactionsHisoryScreen } from 'screens/transactions-history-screen/transactions-history-screen';
import FlashMessage from 'react-native-flash-message';
import { useSelector } from 'react-redux';
import AppState from './domain/app-state/app-state';
import { SetUpScreen } from 'screens/set-up-screen/set-up-screen';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={<Ionicons name="home-outline" size={22} />} />
    <BottomNavigationTab icon={<Ionicons name="add-circle-outline" size={22} />} />
    <BottomNavigationTab icon={<Ionicons name="settings-outline" size={22} />} />
    <BottomNavigationTab icon={<Ionicons name="cash-outline" size={22} />} />
  </BottomNavigation>
)

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="home" component={HomeScreen} options={{headerShown: false}}/>
    <Screen name="add-transaction" component={AddTransactionScreen} options={{headerShown: false}}/>
    <Screen name="settings" component={SettingsScreen} options={{headerShown: false}}/>
    <Screen name="transactions-history" component={TransactionsHisoryScreen} options={{headerShown: false}}/>
  </Navigator>
)

const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
)

export default function App() {
  const isAppReady = useSelector((state: AppState) => state.globalState.isSetUp);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <FlashMessage position="top"/>
      { isAppReady ? (
        <AppNavigator />
      ) : (
        <SetUpScreen />
      )}
    </ApplicationProvider>
  )
}