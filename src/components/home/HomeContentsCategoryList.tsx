import * as React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {HomeContentsCategoryItem} from './HomeContentsCagegoryItem';

export function HomeContentsCategoryList(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}>
        <HomeContentsCategoryItem />
        <HomeContentsCategoryItem />
        <HomeContentsCategoryItem />
        <HomeContentsCategoryItem />
        <HomeContentsCategoryItem />
        <HomeContentsCategoryItem />
        <HomeContentsCategoryItem />
        <HomeContentsCategoryItem />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 18,
  },
  scrollView: {
    columnGap: 8,
  },
});
