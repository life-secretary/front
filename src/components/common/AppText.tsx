import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function AppText({style, children}: any): React.JSX.Element {
  return (
    <View>
      <Text style={[styles.text, style]}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard Variable',
    fontSize: 16,
    color: 'black',
  },
});
