import React, {useState} from 'react';

import {StyleSheet, Pressable, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';

type Props = {
  item: object;
  activeCategory: object;
  handleActiveCategory: Function;
};

export function HomeContentsCategoryItem({
  item,
  activeCategory,
  handleActiveCategory,
}: Props): React.JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const handleCategoryPress = (category: object) => {
    setIsActive(!isActive);
    handleActiveCategory(category);
  };

  return (
    <Pressable onPress={() => handleCategoryPress(item)}>
      <View
        style={[
          activeCategory?.category === item?.category
            ? styles.pressedButton
            : styles.defaultButton,
          styles.button,
        ]}>
        <AppText
          style={[
            activeCategory?.category === item?.category
              ? styles.pressedText
              : styles.defaultText,
            styles.text,
          ]}>
          {item?.title}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 18.5,
  },
  defaultButton: {
    backgroundColor: color.grey.grey100,
  },
  pressedButton: {
    backgroundColor: color.main.primary,
  },
  text: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 17.9,
  },
  defaultText: {
    fontWeight: font.fontWeight.medium,
    color: color.grey.grey500,
  },
  pressedText: {
    fontWeight: font.fontWeight.semiBold,
    color: color.main.white,
  },
});
