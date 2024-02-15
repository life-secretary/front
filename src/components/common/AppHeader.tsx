import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from './AppText';

export function AppHeader(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.headerText}>Header</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
  },
  headerText: {
    textAlign: 'center',
  },
});
