import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { Button } from 'react-native-paper';
import { getUserDocRef } from '../../api/user/refs';
import { UserDocument } from '../../api/user/types';
import InfoGraph from '../../components/Elements/InfoGraph';
import InfoView from '../../components/Elements/InfoView';
import BodyCompModal from '../../components/Elements/Modals/BodyCompModal';
import CalorieModal from '../../components/Elements/Modals/CalorieModal';
import ExerciseModal from '../../components/Elements/Modals/ExecriseModal';
import WaterModal from '../../components/Elements/Modals/WaterModal';
import Spinner from '../../components/Elements/Spinner';

const HomeScreen = () => {
  const [userData, setUserData] = useState<UserDocument>();
  const [showGraph, setShowGraph] = useState(false);
  const [showBodyCompModal, setShowBodyCompModal] = useState(false);
  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showCalorieModal, setshowCalorieModal] = useState(false);
  const [showExerciseModal, setshowExerciseModal] = useState(false);
  const { height } = useWindowDimensions();

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
    <View style={[styles.container, { minHeight: Math.round(height) }]}>
      <BodyCompModal
        visible={showBodyCompModal}
        setVisible={setShowBodyCompModal}
      />

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
            <Button onPress={() => setShowBodyCompModal(true)}>Record</Button>
          </>
        }
      />

      {showGraph && <InfoGraph />}

      <WaterModal visible={showWaterModal} setVisible={setShowWaterModal} />

      <InfoView
        header="Water"
        texts={[['Glasses', `${userData.water}`]]}
        buttons={
          <Button onPress={() => setShowWaterModal(true)}>Record</Button>
        }
      />

      <CalorieModal
        visible={showCalorieModal}
        setVisible={setshowCalorieModal}
      />
      <InfoView
        header="Calories"
        texts={[['Intake', `${userData.caloriesIn}cal`]]}
        buttons={
          <Button onPress={() => setshowCalorieModal(true)}>Record</Button>
        }
      />

      <ExerciseModal
        visible={showExerciseModal}
        setVisible={setshowExerciseModal}
      />
      <InfoView
        header="Exercise"
        texts={[['Calories Burned', `${userData.caloriesOut}cal`]]}
        buttons={
          <Button onPress={() => setshowExerciseModal(true)}>Record</Button>
        }
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
