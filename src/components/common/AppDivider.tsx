import React from 'react';

import {StyleSheet, View} from 'react-native';
import color from '@/styles/color';

export function AppDivider({style}: any): React.JSX.Element {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: color.grey.grey100,
  },
});
