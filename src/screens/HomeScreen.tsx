import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Pretendard-Bold',
    textAlign: 'center',
  },
});
