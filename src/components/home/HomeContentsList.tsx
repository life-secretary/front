import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {HomeContentsItem} from './HomeContentsItem';
import {AppText} from '../common/AppText';
import {ViewMoreButton} from './ViewMoreButton';
import {HomeContentsCategoryList} from './HomeContentsCategoryList';

export function HomeContentsList(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <AppText style={styles.listTitle}>List Title</AppText>
      <HomeContentsCategoryList />
      <HomeContentsItem />
      <HomeContentsItem />
      <HomeContentsItem />
      <HomeContentsItem />
      <HomeContentsItem />
      <ViewMoreButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 26,
  },
  listTitle: {
    marginTop: 36,
    fontSize: 20,
    fontWeight: '700',
  },
});
