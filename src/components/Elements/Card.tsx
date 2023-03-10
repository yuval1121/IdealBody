import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type cardText = [[string, string], [string, string]?];

interface Props {
  header: string;
  texts: cardText;
  buttons: () => JSX.Element;
}

const Card = ({ header, texts, buttons }: Props) => {
  const [firstText, secondText] = texts;

  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>{header}</Text>
      <View style={styles.textView}>
        <View>
          <Text style={{ color: 'white' }}>{firstText[0]}</Text>
          <Text style={{ color: 'white' }}>{firstText[1]}</Text>
        </View>
        {secondText && (
          <View>
            <Text style={{ color: 'white' }}>{secondText[0]}</Text>
            <Text style={{ color: 'white' }}>{secondText[1]}</Text>
          </View>
        )}
      </View>

      <View style={styles.buttonView}>{buttons()}</View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width: '80%',
    height: '10%',
    backgroundColor: '#222222',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardHeader: {
    color: 'black',
    position: 'absolute',
    bottom: 60,
    left: 5,
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
