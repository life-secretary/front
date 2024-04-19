import React from 'react';

import {ActivityIndicator, StyleSheet, View} from 'react-native';

export function AppSpinner({
  size = 'small',
  color,
  style,
}: any): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} style={style} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
