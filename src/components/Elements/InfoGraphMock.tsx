import dayjs from 'dayjs';
import { useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { Surface, Text, useTheme } from 'react-native-paper';
import { UserDocument } from '../../api/user/types';
import Spinner from './Spinner';
type t = Omit<UserDocument, 'timestamp'> & { timestamp: Date };

interface Props {
  data: t[] | null;
}

const InfoGraphMock = ({ data }: Props) => {
  const [last6Days] = useState(data);

  const { height, width } = useWindowDimensions();
  const { colors, dark } = useTheme();

  if (!last6Days) {
    return (
      <View>
        <Spinner />
      </View>
    );
  }

  const last6DaysLabels = last6Days.map(doc =>
    dayjs(doc.timestamp).format('ddd')
  );
  const last6DaysData = last6Days.map(doc => doc.weight);
  const chartColors: ChartConfig['color'] = (opacity = 1) =>
    dark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;

  if (last6Days.length === 0) {
    return (
      <Surface
        testID="MainContainerEmpty"
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
    <Surface testID="MainContainerFull" style={styles.container}>
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

export default InfoGraphMock;

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
