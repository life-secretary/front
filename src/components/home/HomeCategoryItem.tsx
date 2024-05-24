import React from 'react';

import {StyleSheet, Pressable} from 'react-native';
import {AppText} from '@/components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import {font} from '@/styles/font';
import color from '@/styles/color';
import {getFontSize} from '@/utils/font';

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

  return (
    <Pressable
      style={styles.container}
      onPress={() => handlePress(item?.category)}>
      <AppIcon
        name={String(item?.category)}
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
    fontSize: getFontSize(13),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 15.51,
    color: color.grey.grey700,
  },
});
