import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {HomeCategoryItem} from './HomeCategoryItem';

export function HomeCategoryList(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <HomeCategoryItem />
      <HomeCategoryItem />
      <HomeCategoryItem />
      <HomeCategoryItem />
      <HomeCategoryItem />
      <HomeCategoryItem />
      <HomeCategoryItem />
      <HomeCategoryItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 40,
    borderWidth: 1,
    marginVertical: 10,
    padding: 20,
  },
});
