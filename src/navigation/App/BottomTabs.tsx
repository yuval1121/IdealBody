import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DataScreen from '../../screens/DataScreen';
import HomeScreen from '../../screens/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Test" component={DataScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
