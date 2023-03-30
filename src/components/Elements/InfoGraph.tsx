import dayjs from 'dayjs';
import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { Surface, Text, useTheme } from 'react-native-paper';
import { getLast6Days } from '../../api/user/dataHistory';
import { getDataHistoryDocRef } from '../../api/user/dataHistory/refs';
import { UserDocument } from '../../api/user/types';
import { getTodaysTimestamp } from '../../utils/dates';
import Spinner from './Spinner';

const InfoGraph = () => {
  // Default array is set to undefined because the chart package crashes if it receives an empty array
  const [last6Days, setLast6Days] = useState<UserDocument[]>();

  const { height, width } = useWindowDimensions();
  const { colors, dark } = useTheme();

  useEffect(() => {
    try {
      const timestamp = getTodaysTimestamp();
      const dataRef = getDataHistoryDocRef(timestamp);
      const unsub = onSnapshot(dataRef, () => {
        getLast6Days(timestamp)
          .then(data => setLast6Days(data))
          .catch(e => console.log(e));
      });

      return unsub;
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (!last6Days) {
    return (
      <View>
        <Spinner />
      </View>
    );
  }

  const last6DaysLabels = last6Days.map(doc =>
    dayjs(doc.timestamp.toDate()).format('ddd')
  );
  const last6DaysData = last6Days.map(doc => doc.weight);
  const chartColors: ChartConfig['color'] = (opacity = 1) =>
    dark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;

  if (last6Days.length === 0) {
    return (
      <Surface
        style={[
          styles.emptyGraph,
          {
            width: width * 0.8,
            height: height * 0.25,
          },
        ]}
      >
        <Text>No Data available</Text>
      </Surface>
    );
  }

  return (
    <Surface style={styles.container}>
      <LineChart
        data={{
          labels: last6DaysLabels,
          datasets: [
            {
              data: last6DaysData,
            },
          ],
        }}
        width={width * 0.8}
        height={height * 0.25}
        yAxisLabel=""
        yAxisSuffix="kg"
        yAxisInterval={1}
        chartConfig={{
          backgroundGradientFrom: colors.elevation.level1,
          backgroundGradientTo: colors.elevation.level1,
          fillShadowGradientFrom: colors.elevation.level1,
          fillShadowGradientTo: colors.elevation.level1,
          decimalPlaces: 1,
          color: chartColors,
          labelColor: chartColors,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: colors.primary,
          },
        }}
        style={{
          borderRadius: 16,
        }}
      />
    </Surface>
  );
};

export default InfoGraph;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 10,
  },
  emptyGraph: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
