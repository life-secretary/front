import React from 'react';

import type {CategoryObject} from '../../models/common';

import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {HomeCategoryItem} from '@/components/home/HomeCategoryItem';
import color from '@/styles/color';
import spacing from '@/styles/spacing';

type Props = {
  categories: CategoryObject[];
  openCategoryModal: Function;
};

export function HomeCategoryList({
  categories,
  openCategoryModal,
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <HomeCategoryItem
            item={{...item}}
            openCategoryModal={() => openCategoryModal(item)}
          />
        )}
        keyExtractor={item => String(item?.id)}
        horizontal={false}
        numColumns={4}
        columnWrapperStyle={styles.listColumn}
        contentContainerStyle={styles.listRow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.layoutPaddingHorizontal,
    marginVertical: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: color.main.white,
    ...Platform.select({
      ios: {
        shadowColor: color.shadow.box,
        shadowOpacity: 0.5,
        shadowRadius: 20,
        shadowOffset: {width: 0, height: 0},
      },
      android: {
        shadowColor: color.shadow.box,
        elevation: 1,
      },
    }),
  },
  listColumn: {
    gap: 37,
  },
  listRow: {
    gap: 14,
  },
});
