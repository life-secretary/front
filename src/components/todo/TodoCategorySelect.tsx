import React from 'react';

import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {font} from '@/styles/font';
import color from '@/styles/color';

const DUMMY_SELECT_OPTIONS = [
  {key: 'NONE', text: '선택안함'},
  {key: 'ECONOMY', text: '경제'},
  {key: 'LAW', text: '법'},
  {key: 'ECO', text: '환경'},
  {key: 'SELFDEV', text: '자기계발'},
  {key: 'HEALTH', text: '건강'},
  {key: 'CULTURE', text: '문화'},
  {key: 'USER', text: '직접입력'},
];

type TodoCategorySelectProps = {
  handleSelectCategory: Function;
  handleBottomSheetVisible: Function;
  isVisible: boolean;
};

export function TodoCategorySelect({
  handleSelectCategory,
  handleBottomSheetVisible,
}: TodoCategorySelectProps): React.JSX.Element {
  const handleSelectOption = (option: object) => {
    handleSelectCategory(option);
    // TODO: 아래 핸들러가 제대로 값을 넘기지 못하는 버그 해결
    handleBottomSheetVisible(false);
  };

  return (
    <View style={styles.selectContainer}>
      <AppText style={styles.title}>할 일의 분야를 선택해주세요</AppText>
      <FlatList
        data={DUMMY_SELECT_OPTIONS}
        renderItem={({item}) => (
          <View style={styles.optionContainer}>
            <Pressable
              style={styles.option}
              onPress={() => handleSelectOption(item)}>
              <AppText style={styles.optionText}>{item.text}</AppText>
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
