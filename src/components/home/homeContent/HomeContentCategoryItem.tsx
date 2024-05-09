import React from 'react';

import {StyleSheet, Pressable, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';

type Props = {
  item: object;
  homeContentFilter: object;
  handleHomeContentFilter: Function;
};

export function HomeContentCategoryItem({
  item,
  homeContentFilter,
  handleHomeContentFilter,
}: Props): React.JSX.Element {
  const handleHomeContentFilterPress = (filter: object) => {
    handleHomeContentFilter(filter);
  };

  return (
    <Pressable onPress={() => handleHomeContentFilterPress(item)}>
      <View
        style={[
          homeContentFilter?.category === item?.category
            ? styles.pressedButton
            : styles.defaultButton,
          styles.button,
        ]}>
        <AppText
          style={[
            homeContentFilter?.category === item?.category
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
