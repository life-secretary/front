import React from 'react';
import {useSetRecoilState} from 'recoil';
import {bottomSheetVisibleState} from '@/store/bottomSheetState';

import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {font} from '@/styles/font';
import color from '@/styles/color';

import {getFontSize} from '@/utils/font';

type Props = {
  selectOptions: object[];
  handleSelectAgeRange: Function;
};

export function MyAgeRangeSelect({
  selectOptions,
  handleSelectAgeRange,
}: Props): React.JSX.Element {
  const setIsVisible = useSetRecoilState(bottomSheetVisibleState);

  const handleSelectOption = (option: object) => {
    handleSelectAgeRange(option);
    setIsVisible(false);
  };

  return (
    <View style={styles.selectContainer}>
      <AppText style={styles.title}>연령층을 선택해주세요</AppText>
      <FlatList
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
        data={selectOptions}
        renderItem={({item}) => (
          <View style={styles.optionContainer}>
            <Pressable
              style={styles.option}
              onPress={() => handleSelectOption(item)}>
              <AppText style={styles.optionText}>{item.title}</AppText>
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
    fontSize: getFontSize(20),
    fontWeight: font.fontWeight.semiBold,
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
    fontSize: getFontSize(18),
    fontWeight: font.fontWeight.medium,
    lineHeight: 21.48,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey600,
  },
  row: {
    gap: 14,
  },
});
