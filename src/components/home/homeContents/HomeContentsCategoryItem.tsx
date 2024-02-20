import * as React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {AppText} from '../../common/AppText';

type ItemProps = {
  category: string;
  title: string;
};

const handlePress: any = (item: string) => {
  console.log(item);
};

export function HomeContentsCategoryItem({
  category,
  title,
}: ItemProps): React.JSX.Element {
  return (
    <Pressable
      style={({pressed}) => [
        pressed ? styles.pressedButton : styles.defaultButton,
        styles.button,
      ]}
      onPress={handlePress(category)}>
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
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  defaultButton: {
    backgroundColor: '#F2F4F7',
  },
  pressedButton: {
    backgroundColor: '#0B2A4F',
  },
  text: {
    fontSize: 15,
    marginTop: 5,
  },
  defaultText: {
    fontWeight: '500',
    color: '#526070',
  },
  pressedText: {
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
