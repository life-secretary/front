import React from 'react';

import {StyleSheet, View, FlatList, Platform} from 'react-native';
import {HomeCategoryItem} from '@/components/home/HomeCategoryItem';
import color from '@/styles/color';

import {generateRandomId} from '@/utils';

type ItemProps = {
  openCategoryModal: Function;
};

export const DUMMY_CATEGORY = [
  {
    id: generateRandomId(),
    category: 'all',
    title: '전체',
  },
  {
    id: generateRandomId(),
    category: 'economy',
    title: '경제',
  },
  {
    id: generateRandomId(),
    category: 'law',
    title: '법',
  },
  {
    id: generateRandomId(),
    category: 'eco',
    title: '환경',
  },
  {
    id: generateRandomId(),
    category: 'selfdev',
    title: '자기계발',
  },
  {
    id: generateRandomId(),
    category: 'health',
    title: '건강',
  },
  {
    id: generateRandomId(),
    category: 'culture',
    title: '문화',
  },
  {
    id: generateRandomId(),
    category: 'etc',
    title: '기타',
  },
];

export function HomeCategoryList({
  openCategoryModal,
}: ItemProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_CATEGORY}
        renderItem={({item}) => (
          <HomeCategoryItem
            title={item.title}
            category={item.category}
            openCategoryModal={openCategoryModal}
          />
        )}
        keyExtractor={item => item.id}
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
