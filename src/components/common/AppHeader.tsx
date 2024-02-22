import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export function AppHeader({children, style}: any): React.JSX.Element {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: 10,
  },
});
