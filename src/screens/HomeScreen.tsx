import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../components/ui/AppText';

export function HomeScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>Home Screen</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '700',
  },
});
