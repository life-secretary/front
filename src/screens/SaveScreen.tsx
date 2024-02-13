import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function SaveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Save Screen</Text>
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
  },
});
