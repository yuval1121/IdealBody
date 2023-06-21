import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getAuth } from 'firebase/auth';
import { IconButton, Tooltip } from 'react-native-paper';
import HomeScreen from '../../screens/App/HomeScreen';
import { default as RecipesScreen } from '../../screens/App/RecipesScreen';
import { default as WorkoutScreen } from '../../screens/App/WorkoutScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
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
          return (
            <Tooltip title="Log out" leaveTouchDelay={750}>
              <IconButton icon="logout-variant" onPress={handleLogout} />
            </Tooltip>
          );
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
        name="Workouts"
        component={WorkoutScreen}
        options={{
          tabBarLabel: 'Workouts',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="arm-flex" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarLabel: 'Recipes',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="food-bank" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
