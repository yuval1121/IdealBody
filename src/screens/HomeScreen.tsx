import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { UserData, UserModelData } from '../api/user/types';
import InfoView from '../components/Elements/InfoView';
import Spinner from '../components/Elements/Spinner';
import { db } from '../config/firebase';
import { getCurrentUser } from '../utils/auth';
import universalConverter from '../utils/converters';

const HomeScreen = () => {
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    try {
      const user = getCurrentUser();
      const docRef = doc(db, 'users', user.uid).withConverter(
        universalConverter<UserModelData>()
      );
      const unsub = onSnapshot(docRef, doc => {
        setUserData(doc.data()?.current);
      });

      return unsub;
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (!userData) return <Spinner />;

  return (
    <View style={styles.container}>
      <InfoView
        header="Body Composition"
        texts={[
          ['Weight', `${userData.weight}kgs`],
          ['BMI', `${userData.BMI}`],
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
      <InfoView
        header="Water"
        texts={[['Glasses', `${userData.water}`]]}
        buttons={() => <Button>Record</Button>}
      />
      <InfoView
        header="Calories"
        texts={[['Intake', `${userData.caloriesIn}cal`]]}
        buttons={() => <Button>Record</Button>}
      />
      <InfoView
        header="Exercise"
        texts={[['Calories Burned', `${userData.caloriesOut}cal`]]}
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
