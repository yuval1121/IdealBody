import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getUserDocRef } from '../../api/user/refs';
import { UserDocument } from '../../api/user/types';
import InfoGraph from '../../components/Elements/InfoGraph';
import InfoView from '../../components/Elements/InfoView';
import Spinner from '../../components/Elements/Spinner';

const HomeScreen = () => {
  const [userData, setUserData] = useState<UserDocument>();
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    try {
      const userRef = getUserDocRef();
      const unsub = onSnapshot(userRef, doc => {
        setUserData(doc.data());
      });

      return unsub;
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleGraph = () => {
    setShowGraph(prev => !prev);
  };

  if (!userData) return <Spinner />;

  return (
    <View style={styles.container}>
      <InfoView
        header="Body Composition"
        texts={[
          ['Weight', `${userData.weight}kgs`],
          ['BMI', `${userData.BMI}`],
        ]}
        buttons={
          <>
            <Button mode="contained" onPress={handleGraph}>
              Graph
            </Button>
            <Button>Record</Button>
          </>
        }
      />

      {showGraph && <InfoGraph />}

      <InfoView
        header="Water"
        texts={[['Glasses', `${userData.water}`]]}
        buttons={<Button>Record</Button>}
      />
      <InfoView
        header="Calories"
        texts={[['Intake', `${userData.caloriesIn}cal`]]}
        buttons={<Button>Record</Button>}
      />
      <InfoView
        header="Exercise"
        texts={[['Calories Burned', `${userData.caloriesOut}cal`]]}
        buttons={<Button>Record</Button>}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    rowGap: 40,
    marginVertical: '15%',
  },
});
