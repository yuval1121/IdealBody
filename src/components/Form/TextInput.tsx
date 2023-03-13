import {
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { StyleSheet } from 'react-native';
import {
  TextInput as TextInputPaper,
  TextInputProps,
  useTheme,
} from 'react-native-paper';
import { MakePropertyOptional, MakePropertyRequired } from '../../utils/types';

type CustomTextInputProps = MakePropertyOptional<TextInputProps, 'theme'> & {
  errorIcon?: string;
};

type CustomUseControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = MakePropertyRequired<UseControllerProps<TFieldValues, TName>, 'control'>;

export const TextInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  rules,
  defaultValue,
  shouldUnregister,
  errorIcon,
  ...props
}: CustomUseControllerProps<TFieldValues, TName> & CustomTextInputProps) => {
  const { colors } = useTheme();
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  });

  const renderErrorIcon = () => {
    if (errorIcon) {
      return (
        fieldState.error && (
          <TextInputPaper.Icon
            icon={errorIcon}
            iconColor={colors.error}
            forceTextInputFocus={false}
          />
        )
      );
    }

    return null;
  };

  return (
    <TextInputPaper
      style={[styles.textInput, props.style]}
      error={fieldState.error ? true : false}
      value={field.value}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      right={renderErrorIcon()}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'transparent',
  },
});
