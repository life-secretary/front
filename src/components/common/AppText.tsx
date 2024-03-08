import * as React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';
import {getFontSize} from '../../utils/font';

type AppTextProps = {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  isEllipsizeMode?: boolean;
};

export function AppText({
  children,
  style,
  isEllipsizeMode,
}: AppTextProps): React.JSX.Element {
  return (
    <Text
      style={[styles.text, style]}
      ellipsizeMode={isEllipsizeMode ? 'tail' : 'tail'}
      numberOfLines={isEllipsizeMode ? 1 : 0}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard Variable',
    fontSize: getFontSize(16),
    color: 'black',
  },
});
