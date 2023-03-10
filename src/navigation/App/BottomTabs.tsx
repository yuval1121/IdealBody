import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth } from 'firebase/auth';
import { Button } from 'react-native-paper';
import CalculatorScreen from '../../screens/CalculatorScreen';
import DataScreen from '../../screens/DataScreen';
import HomeScreen from '../../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
    } catch (e) {
      const k;
      console.log(k);
      console.log(e);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => {
          return <Button onPress={handleLogout}>Logout</Button>;
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="AddScreen"
        component={DataScreen}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
        options={{
          tabBarLabel: 'Calculator',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
