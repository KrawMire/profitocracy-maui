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

// const getNavIcon = (focused: boolean, iconName: string) =>
//   focused ? `${iconName}-sharp` : `${iconName}-outline`;

// export default function App() {
//   const appState = useSelector((state: AppState) => state);

//   return (
//     <NavigationContainer>
//       <Tab.Navigator screenOptions={({route}) => ({
//         headerShown: false
//         })
//       }>
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarShowLabel: false,
//             tabBarIcon: ({focused, size}) => (
//               <Ionicons name={getNavIcon(focused, "home")} size={size} color={"#424242"} />
//             )
//           }}
//         />
//         <Tab.Screen
//           name="Statistics"
//           component={StatisticsScreen}
//           options={{
//             tabBarShowLabel: false,
//             tabBarIcon: ({focused, size}) => (
//               <Ionicons name={getNavIcon(focused, "stats-chart")} size={size} color={"#d6d6d6"} />
//             ),
//           }}

//           /* Temporary solution because feature is disabled */
//           listeners={{
//             tabPress: (e) => e.preventDefault()
//           }}
//         />
//         <Tab.Screen
//           name="Add transaction"
//           component={AddTransactionScreen}
//           options={{
//             tabBarShowLabel: false,
//             tabBarIcon: ({focused, size}) => (
//               <Ionicons name="add-circle-sharp" size={size*2} color={focused ? "#4EBC7A" : "#5BE090"} />
//             )
//           }}
//         />
//         <Tab.Screen
//           name="Settings"
//           component={SettingsScreen}
//           options={{
//             tabBarShowLabel: false,
//             tabBarIcon: ({focused, size}) => (
//               <Ionicons name={getNavIcon(focused, "settings")} size={size} color={"#424242"} />
//             )
//           }}
//         />
//         <Tab.Screen
//           name="Profiles"
//           component={TransactionsHisoryScreen}
//           options={{
//             tabBarShowLabel: false,
//             tabBarIcon: ({focused, size}) => (
//               <Ionicons name={getNavIcon(focused, "cash")} size={size} color={"#424242"} />
//             )
//           }}
//         />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

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
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <FlashMessage position="top"/>
      <AppNavigator />
    </ApplicationProvider>
  )
}