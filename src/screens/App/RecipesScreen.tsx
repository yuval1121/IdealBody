import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Surface, Text } from 'react-native-paper';
import { enterPrompt } from '../../api/chatgpt';
import { getUserData } from '../../api/user';
import Spinner from '../../components/Elements/Spinner';

const RecipeScreen = () => {
  const [plan, setPlan] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPlan = async () => {
      const plan = await AsyncStorage.getItem('MenuPlan');
      if (plan) {
        setPlan(plan);
      }
    };

    getPlan().catch(e => console.log(e));
  });

  const generateMenu = async () => {
    try {
      setIsLoading(true);
      const userData = await getUserData();

      if (!userData) {
        throw new Error('No user data found');
      }

      const msg = `Suggest me a nutrition plan, I am a person that is ${userData.height} meters tall and weighs ${userData.weight} kilograms, my BMI is ${userData.BMI}. Show only the plan and nothing more, no extra words and no notes. Show the recipes as well.`;

      const content = await enterPrompt(msg);
      setIsLoading(false);
      await AsyncStorage.setItem('MenuPlan', content);
      setPlan(content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Surface style={styles.innerContainer}>
        <ScrollView>
          {isLoading ? <Spinner /> : <Text style={styles.text}>{plan}</Text>}
        </ScrollView>
      </Surface>
      <Button style={styles.button} onPress={generateMenu} mode="contained">
        Generate Menu
      </Button>
    </View>
  );
};

export default RecipeScreen;

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
