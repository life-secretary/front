import color from '@/styles/color';
import * as React from 'react';

import {StyleSheet, View} from 'react-native';

export function AppDivider(): React.JSX.Element {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 16,
    backgroundColor: color.grey.grey100,
  },
});
