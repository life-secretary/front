import React from 'react';

import {StyleSheet, View} from 'react-native';
import {TodoTabOption} from '@/components/todo/TodoTabOption';
import color from '@/styles/color';
import {useSetRecoilState} from 'recoil';
import {todoListFilterState} from '@/store/todoState';

type Props = {
  tabOptions: string[];
  selectedIndex: number;
  onTabPress: Function;
};

export function TodoTabBar({
  tabOptions,
  selectedIndex,
  onTabPress,
}: Props): React.JSX.Element {
  const setTodoListFilterState = useSetRecoilState(todoListFilterState);

  const handleTabPress = (index: number, tab: string) => {
    if (index !== selectedIndex) {
      onTabPress(index);
      setTodoListFilterState(tab);
    }
  };

  return (
    <View style={styles.container}>
      {tabOptions.map((tab, index) => (
        <TodoTabOption
          key={tab}
          tab={tab}
          index={index}
          isTabActive={selectedIndex === index}
          onTabPress={() => handleTabPress(index, tab)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 12,
    backgroundColor: color.main.white,
  },
});
