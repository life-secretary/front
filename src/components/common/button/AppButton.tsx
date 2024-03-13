import * as React from 'react';
import {
  Pressable,
  TextStyle,
  ViewStyle,
  ImageRequireSource,
  Image,
} from 'react-native';
import {AppText} from '../AppText';

type AppButtonProps = {
  // type: string;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  children: React.ReactNode;
  startIcon?: ImageRequireSource;
  endIcon?: ImageRequireSource;
  onPress?: Function;
};

export function AppButton({
  children,
  buttonStyle,
  textStyle,
  startIcon,
  endIcon,
}: AppButtonProps): React.JSX.Element {
  return (
    <Pressable style={buttonStyle}>
      {startIcon && <Image source={startIcon} />}
      <AppText style={textStyle}>{children}</AppText>
      {endIcon && <Image source={endIcon} />}
    </Pressable>
  );
}
