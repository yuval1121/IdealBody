import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth } from 'firebase/auth';
import { IconButton } from 'react-native-paper';
import CalculatorScreen from '../../screens/App/CalculatorScreen';
import DataScreen from '../../screens/App/DataScreen';
import HomeScreen from '../../screens/App/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => {
          return <IconButton icon="logout" onPress={handleLogout} />;
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={DataScreen}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Calculator"
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
