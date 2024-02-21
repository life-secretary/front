import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {TodoTabOption} from './TodoTabOption';

type Props = {
  tabOptions: string[];
  selectedIndex: number;
  onTabPress: Function;
};

const handleTabPress = (
  index: number,
  selectedIndex: number,
  onTabPress: Function,
) => {
  if (index !== selectedIndex) {
    onTabPress(index);
  }
};

export function TodoTabBar({
  tabOptions,
  selectedIndex,
  onTabPress,
}: Props): React.JSX.Element {
  return (
    <View style={styles.container}>
      {tabOptions.map((tab, index) => (
        <TodoTabOption
          key={tab}
          tab={tab}
          index={index}
          isTabActive={selectedIndex === index}
          onTabPress={() => handleTabPress(index, selectedIndex, onTabPress)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 5,
    marginBottom: 22,
  },
});
