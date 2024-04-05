import color from '@/styles/color';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../../common/AppText';
import {font} from '@/styles/font';
import AppButton from '../../common/AppButton';
import {useNavigation} from '@react-navigation/native';

type UserInfoSectionProps = {
  settingMenu: object;
  user: object;
};

export function MyInfoSection({
  settingMenu,
  user,
}: UserInfoSectionProps): React.JSX.Element {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('SettingModal', {
      headerTitle: settingMenu?.title,
      menu: settingMenu,
      user,
    });
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.username}>{user?.nickname}</AppText>
      <AppButton
        text="내 정보"
        textStyle={styles.buttonText}
        buttonStyle={styles.button}
        onPressButton={handleButtonPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingVertical: 22,
    borderRadius: 12,
    backgroundColor: color.grey.grey100,
  },
  username: {
    fontSize: 24,
    fontWeight: font.fontWeight.bold,
    lineHeight: 28.64,
    letterSpacing: font.letterSpacing.medium,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: color.grey.grey600,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 16.71,
    color: color.main.white,
  },
});
