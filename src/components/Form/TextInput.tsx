import {
  TextInput as TextInputPaper,
  TextInputProps,
} from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { MakePropertyOptional } from '../../utils/typeUtils';

type CustomTextInputProps = MakePropertyOptional<TextInputProps, 'theme'>;

export const TextInput = ({ style, ...props }: CustomTextInputProps) => {
  return <TextInputPaper style={[style, styles.textInput]} {...props} />;
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
  },
});
