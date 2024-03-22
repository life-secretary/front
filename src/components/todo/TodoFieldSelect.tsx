import * as React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';

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

type TodoFieldSelectProps = {
  handleSelectField: Function;
  handleBottomSheetVisible: Function;
  isVisible: boolean;
};

export function TodoFieldSelect({
  handleSelectField,
  handleBottomSheetVisible,
  isVisible,
}: TodoFieldSelectProps): React.JSX.Element {
  const handleSelectOption = (option: object) => {
    handleSelectField(option);
    // TODO: 아래 핸들러가 제대로 값을 넘기지 못하는 버그 해결
    handleBottomSheetVisible(false);
  };

  return (
    <View style={styles.selectContainer}>
      <AppText style={styles.selectTitle}>할 일의 분야를 선택해주세요</AppText>
      <AppText>{isVisible}</AppText>
      <FlatList
        data={DUMMY_SELECT_OPTIONS}
        renderItem={({item}) => (
          <View style={styles.optionContainer}>
            <Pressable
              style={styles.option}
              onPress={() => handleSelectOption(item)}>
              <AppText>{item.text}</AppText>
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
    padding: 24,
  },
  selectTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  optionContainer: {
    flex: 1,
  },
  option: {
    borderWidth: 1,
    paddingVertical: 8,
  },
  row: {
    gap: 14,
  },
});
