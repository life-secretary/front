import React from 'react';

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';

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
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12,
  },
  tabText: {
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    color: color.grey.grey400,
  },
  activeTab: {
    backgroundColor: color.grey.grey700,
  },
  activeTabText: {
    color: color.main.white,
  },
});
