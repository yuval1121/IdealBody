import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { enterPrompt } from '../../api/chatgpt';
import { getUserData } from '../../api/user';
import Spinner from '../../components/Elements/Spinner';

const WorkoutScreen = () => {
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPlan = async () => {
      const plan = await AsyncStorage.getItem('WorkoutPlan');
      if (plan) {
        setPlan(plan);
      }
    };

    getPlan().catch(e => console.log(e));
  }, []);

  const generateWorkout = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserData();

      if (!userData) {
        throw new Error('No user data found');
      }

      const msg = `Suggest me a workout plan, I am a person that is ${userData.height} meters tall and weighs ${userData.weight} kilograms, my BMI is ${userData.BMI}. Show only the plan and nothing more, no extra words and no notes.`;

      const content = await enterPrompt(msg);

      setIsLoading(false);
      await AsyncStorage.setItem('WorkoutPlan', content);
      setPlan(content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.innerContainer}>
        <ScrollView>
          {isLoading ? (
            <Spinner centered />
          ) : (
            <Text style={styles.text}>{plan}</Text>
          )}
        </ScrollView>
      </Surface>
      <Button style={styles.button} onPress={generateWorkout} mode="contained">
        Generate Plan
      </Button>
    </View>
  );
};

export default WorkoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '80%',
    height: '80%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
  },
  text: {
    textAlign: 'center',
  },
});
