import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export function AppHeader({children}: any): React.JSX.Element {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: 10,
    paddingVertical: 16,
  },
});
