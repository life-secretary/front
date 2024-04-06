import * as React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '../common/AppText';
import color from '@/styles/color';

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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '50%',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: color.grey.grey400,
  },
  activeTab: {
    backgroundColor: color.grey.grey700,
  },
  activeTabText: {
    color: color.main.white,
  },
});
