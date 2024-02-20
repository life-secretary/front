import * as React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

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
      ellipsizeMode={isEllipsizeMode ? 'tail' : null}
      numberOfLines={isEllipsizeMode ? 1 : null}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard Variable',
    fontSize: 16,
    color: 'black',
  },
});
