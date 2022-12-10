import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import TestScreen from '../../screens/TestScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Test" component={TestScreen} />
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
    </Tab.Navigator>
  );
};
