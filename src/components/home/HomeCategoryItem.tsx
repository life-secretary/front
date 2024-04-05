import React from 'react';

import {StyleSheet, Pressable} from 'react-native';
import {AppText} from '@/components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import {font} from '@/styles/font';
import color from '@/styles/color';

type ItemProps = {
  category: string;
  title: string;
  openCategoryModal: Function;
};

export function HomeCategoryItem({
  category,
  title,
  openCategoryModal,
}: ItemProps): React.JSX.Element {
  const handlePress = (category: string) => {
    openCategoryModal(category);
  };

  return (
    <Pressable style={styles.container} onPress={() => handlePress(category)}>
      <AppIcon
        name={category}
        width={44}
        height={44}
        onPress={() => handlePress(category)}
      />
      <AppText style={styles.text}>{title}</AppText>
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
