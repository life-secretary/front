import React from 'react';

import {StyleSheet, View} from 'react-native';
import {TodoTabOption} from '@/components/todo/TodoTabOption';
import color from '@/styles/color';

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
  const handleTabPress = (index: number) => {
    if (index !== selectedIndex) {
      onTabPress(index);
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
          onTabPress={() => handleTabPress(index)}
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
