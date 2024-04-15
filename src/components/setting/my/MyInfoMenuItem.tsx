import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet, View} from 'react-native';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

type Props = {
  myInfoMenu: object;
  user: object;
};

export function MyInfoMenuItem({myInfoMenu, user}: Props): React.JSX.Element {
  const navigation = useNavigation();

  const handleButtonPress = (menu: object) => {
    if (menu?.key === 'resurvey' || menu?.key === 'logout') {
      return;
    }

    navigation.navigate('MyInfoModal', {
      headerTitle: menu?.title,
      menu,
      user,
    });
  };

  return (
    <View style={styles.container}>
      <AppButton
        text={myInfoMenu?.title}
        textStyle={styles.title}
        onPressButton={() => handleButtonPress(myInfoMenu)}
      />
      {myInfoMenu?.icon && (
        <View style={styles.button}>
          <AppIcon
            name={myInfoMenu?.icon?.name}
            width={myInfoMenu?.icon?.width}
            height={myInfoMenu?.icon?.height}
            onPress={() => handleButtonPress(myInfoMenu)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 36,
  },
  title: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
});
