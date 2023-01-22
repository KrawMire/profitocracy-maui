import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { StatisticsScreen } from './ui/screens/statistics-screen/statistics-screen';
import { HomeScreen } from './ui/screens/home-screen/home-screen';
import { AddTransactionScreen } from './ui/screens/add-transaction-screen/add-transaction-screen';
import { TransactionsHisoryScreen } from './ui/screens/transactions-history-screen/transactions-history-screen';
import { SettingsScreen } from './ui/screens/settings-screen/settings-screen';

const Tab = createBottomTabNavigator();

const getNavIcon = (focused: boolean, iconName: string) =>
  focused ? `${iconName}-sharp` : `${iconName}-outline`;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
        headerShown: false
        })
      }>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, size}) => (
              <Ionicons name={getNavIcon(focused, "home")} size={size} color={"#424242"} />
            )
          }}
        />
        <Tab.Screen
          name="Statistics"
          component={StatisticsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, size}) => (
              <Ionicons name={getNavIcon(focused, "stats-chart")} size={size} color={"#d6d6d6"} />
            ),
          }}

          /* Temporary solution because feature is disabled */
          listeners={{
            tabPress: (e) => e.preventDefault()
          }}
        />
        <Tab.Screen
          name="Add transaction"
          component={AddTransactionScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, size}) => (
              <Ionicons name="add-circle-sharp" size={size*2} color={focused ? "#4EBC7A" : "#5BE090"} />
            )
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, size}) => (
              <Ionicons name={getNavIcon(focused, "settings")} size={size} color={"#424242"} />
            )
          }}
        />
        <Tab.Screen
          name="Profiles"
          component={TransactionsHisoryScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, size}) => (
              <Ionicons name={getNavIcon(focused, "cash")} size={size} color={"#424242"} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
