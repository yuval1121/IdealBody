import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { UserModelData } from '../api/user/types';
import Card from '../components/Elements/Card';
import { getCurrentUser } from '../utils/auth';
import { db } from '../utils/config/firebase';
import universalConverter from '../utils/converters';

const HomeScreen = () => {
  const [userData, setUserData] = useState<UserModelData>();

  useEffect(() => {
    try {
      const user = getCurrentUser();
      const docRef = doc(db, 'users', user.uid).withConverter(
        universalConverter<UserModelData>()
      );
      const unsub = onSnapshot(docRef, doc => {
        setUserData(doc.data());
      });

      return unsub;
    } catch (e) {
      console.log(e);
    }
  }, []);

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
