import React from 'react';
import {categoryListState} from '@/store/categoryState';
import {useRecoilValue, useSetRecoilState} from 'recoil';

import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {font} from '@/styles/font';
import color from '@/styles/color';
import {bottomSheetVisibleState} from '@/store/bottomSheetState';

type Props = {
  handleSelectCategory: Function;
};

export function TodoCategorySelect({
  handleSelectCategory,
}: Props): React.JSX.Element {
  const setIsVisible = useSetRecoilState(bottomSheetVisibleState);
  const categories = useRecoilValue(categoryListState);
  const CATEGORY_SELECT_OPTIONS = [
    {id: 0, key: 'none', name: '선택안함'},
    ...categories,
    {id: categories.length + 1, key: 'custom', name: '직접입력'},
  ];

  const handleSelectOption = (option: object) => {
    handleSelectCategory(option);
    setIsVisible(false);
  };

  return (
    <View style={styles.selectContainer}>
      <AppText style={styles.title}>할 일의 분야를 선택해주세요</AppText>
      <FlatList
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        data={CATEGORY_SELECT_OPTIONS}
        renderItem={({item}) => (
          <View style={styles.optionContainer}>
            <Pressable
              style={styles.option}
              onPress={() => handleSelectOption(item)}>
              <AppText style={styles.optionText}>{item.name}</AppText>
            </Pressable>
          </View>
        )}
        contentContainerStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectContainer: {
    gap: 30,
    paddingHorizontal: 40,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 21,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  optionContainer: {
    flex: 1,
  },
  option: {
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 18,
    fontWeight: font.fontWeight.medium,
    lineHeight: 21.48,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey600,
  },
  row: {
    gap: 14,
  },
});
