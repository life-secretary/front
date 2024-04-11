import React, {useCallback} from 'react';

import {StyleSheet, Pressable} from 'react-native';
import {AppText} from '@/components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import {font} from '@/styles/font';
import color from '@/styles/color';

type Props = {
  item: object;
  openCategoryModal: Function;
};

export function HomeCategoryItem({
  item,
  openCategoryModal,
}: Props): React.JSX.Element {
  const handlePress = (category: string) => {
    openCategoryModal(category);
  };

  const setCategoryIcon = useCallback((category: string) => {
    switch (category) {
      case 'all':
        return 'all';
      case 'economy':
        return 'economy';
      case 'law':
        return 'law';
      case 'environment':
        return 'environment';
      case 'self-improvement':
        return 'selfImprovement';
      case 'health':
        return 'health';
      case 'culture':
        return 'culture';
      case 'etc':
        return 'etc';
      default:
        return '';
    }
  }, []);

  return (
    <Pressable
      style={styles.container}
      onPress={() => handlePress(item?.category)}>
      <AppIcon
        name={setCategoryIcon(item?.category)}
        width={44}
        height={44}
        onPress={() => handlePress(item?.category)}
      />
      <AppText style={styles.title}>{item?.title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 5,
  },

  title: {
    fontSize: 13,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 15.51,
    color: color.grey.grey700,
  },
});
