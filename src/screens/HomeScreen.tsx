import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getUserData } from '../api/user';
import { UserModelData } from '../api/user/types';
import Card from '../components/Elements/Card';

const HomeScreen = () => {
  const [userData, setUserData] = useState<UserModelData>();

  const fetchUserData = useCallback(async () => {
    const data = await getUserData();
    if (data) {
      setUserData(data);
    }
  }, []);

  useEffect(() => {
    fetchUserData().catch(e => console.log(e));
  }, [fetchUserData]);

  return (
    <View style={styles.container}>
      <Card
        header="Body Composition"
        texts={[
          ['Weight', `${userData?.currWeight}kgs`],
          ['BMI', `${userData?.currBMI}`],
        ]}
        buttons={() => {
          return (
            <>
              <Button mode="contained">Graph</Button>
              <Button>Record</Button>
            </>
          );
        }}
      />
      <Card
        header="Water"
        texts={[['Glasses', `${userData?.currWater}`]]}
        buttons={() => <Button>Record</Button>}
      />
      <Card
        header="Calories"
        texts={[['Intake', `${userData?.currCaloriesIn}cal`]]}
        buttons={() => <Button>Record</Button>}
      />
      <Card
        header="Exercise"
        texts={[['Calories Burned', `${userData?.currCaloriesOut}cal`]]}
        buttons={() => <Button>Record</Button>}
      />

      <Button onPress={fetchUserData}>Refresh</Button>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    rowGap: 60,
    marginVertical: '15%',
  },
});
