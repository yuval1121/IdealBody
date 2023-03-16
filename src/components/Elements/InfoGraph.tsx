import { StyleSheet, useWindowDimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartConfig } from 'react-native-chart-kit/dist/HelperTypes';
import { useTheme } from 'react-native-paper';

type chartConfigColor = ChartConfig['color'];

const InfoGraph = () => {
  const { height, width } = useWindowDimensions();
  const { colors, dark } = useTheme();

  const chartColors: chartConfigColor = (opacity = 1) =>
    dark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`;

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          datasets: [
            {
              data: [60, 75, 80, 71.52, 77, 81],
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
    </View>
  );
};

export default InfoGraph;

const styles = StyleSheet.create({
  container: {
    width: '80%',
  },
});
