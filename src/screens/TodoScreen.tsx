import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function TodoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todo Screen</Text>
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
