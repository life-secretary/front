import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';

export function HomeImageCarousel(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText>Home Image Carousel</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 450,
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
