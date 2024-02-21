import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '../common/AppText';

type Props = {
  index: number;
  tab: string;
  isTabActive?: boolean;
  onTabPress: Function;
};

export function TodoTabOption({
  tab,
  isTabActive,
  index,
  onTabPress,
}: Props): React.JSX.Element {
  return (
    <TouchableOpacity
      style={[styles.tab, isTabActive ? styles.activeTab : null]}
      onPress={() => onTabPress(index)}>
      <View>
        <AppText
          style={[styles.tabText, isTabActive ? styles.activeTabText : null]}>
          {tab}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A1ACB9',
  },
  activeTab: {
    backgroundColor: '#000E24',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});
