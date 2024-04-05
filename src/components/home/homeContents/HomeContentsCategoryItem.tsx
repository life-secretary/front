import * as React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {AppText} from '../../common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';

type ItemProps = {
  category: string;
  title: string;
};

export function HomeContentsCategoryItem({
  category,
  title,
}: ItemProps): React.JSX.Element {
  const handlePress = (item: string) => {};

  return (
    <Pressable
      style={({pressed}) => [
        pressed ? styles.pressedButton : styles.defaultButton,
        styles.button,
      ]}
      onPress={() => handlePress(category)}>
      {({pressed}) => (
        <AppText
          style={[
            pressed ? styles.pressedText : styles.defaultText,
            styles.text,
          ]}>
          {title}
        </AppText>
      )}
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
    marginTop: 5,
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
