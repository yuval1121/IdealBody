import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

type cardText = [[string, string], [string, string]?];

interface Props {
  header: string;
  texts: cardText;
  buttons: () => JSX.Element;
}

const InfoView = ({ header, texts, buttons }: Props) => {
  const [firstText, secondText] = texts;

  return (
    <Surface style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.textContainer}>
        <View>
          <Text>{firstText[0]}</Text>
          <Text>{firstText[1]}</Text>
        </View>
        {secondText && (
          <View>
            <Text>{secondText[0]}</Text>
            <Text>{secondText[1]}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>{buttons()}</View>
    </Surface>
  );
};

export default InfoView;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: '10%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    bottom: '100%',
    left: '2%',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 25,
    marginLeft: 5,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
