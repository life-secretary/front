import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';

export function HomeContentsItem(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText>Home Contents Item</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    padding: 10,
  },
});
