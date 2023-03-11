import { StyleSheet, View } from 'react-native';
import { Surface, Text } from 'react-native-paper';

type cardText = [[string, string], [string, string]?];

interface Props {
  header: string;
  texts: cardText;
  buttons: () => JSX.Element;
}

const Card = ({ header, texts, buttons }: Props) => {
  const [firstText, secondText] = texts;

  return (
    <Surface style={styles.card}>
      <Text style={styles.cardHeader}>{header}</Text>
      <View style={styles.textView}>
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

      <View style={styles.buttonView}>{buttons()}</View>
    </Surface>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: '10%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    position: 'absolute',
    bottom: '100%',
    left: '2%',
  },
  textView: {
    flex: 1,
    flexDirection: 'row',
    columnGap: 25,
    marginLeft: 5,
  },
  buttonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
