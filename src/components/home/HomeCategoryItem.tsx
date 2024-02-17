import * as React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {AppText} from '../common/AppText';

export function HomeCategoryItem(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Image style={styles.image} />
      <AppText>text</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 44,
  },
  image: {
    width: 44,
    height: 44,
    borderWidth: 1,
  },
});
