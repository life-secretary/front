import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';

export function HomeContentsCategoryItem(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText>Category</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: 'lightgray',
    borderRadius: 18,
    justifyContent: 'center',
  },
});
