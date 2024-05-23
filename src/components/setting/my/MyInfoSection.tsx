import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {userInfoState} from '@/store/userInfoState';

import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

type UserInfoSectionProps = {
  settingMenu: object;
};

export function MyInfoSection({
  settingMenu,
}: UserInfoSectionProps): React.JSX.Element {
  const navigation = useNavigation();
  const userInfo = useRecoilValue(userInfoState);

  const handleButtonPress = () => {
    navigation.navigate('SettingModal', {
      headerTitle: settingMenu?.title,
      menu: settingMenu,
    });
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.username}>{userInfo?.nickname}</AppText>
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
