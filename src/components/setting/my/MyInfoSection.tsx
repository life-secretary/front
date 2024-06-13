import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/userState';

import {StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFontSize} from '@/utils/font';

type UserInfoSectionProps = {
  settingMenu: object;
};

export function MyInfoSection({
  settingMenu,
}: UserInfoSectionProps): React.JSX.Element {
  const navigation = useNavigation();
  const myInfo = useRecoilValue(userState);

  const handleButtonPress = () => {
    navigation.navigate('SettingModal', {
      headerTitle: settingMenu?.title,
      menu: settingMenu,
    });
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.username}>{myInfo?.nickname}</AppText>
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
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingVertical: 22,
    borderRadius: 12,
    backgroundColor: color.grey.grey100,
  },
  username: {
    fontSize: getFontSize(24),
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
    fontSize: getFontSize(14),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 16.71,
    color: color.main.white,
  },
});
