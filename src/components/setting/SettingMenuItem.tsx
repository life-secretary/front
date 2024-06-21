import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Linking, StyleSheet, View} from 'react-native';
import AppButton from '@/components/common/AppButton';
import {AppText} from '@/components/common/AppText';
import {font} from '@/styles/font';
import color from '@/styles/color';

import {getFontSize} from '@/utils/font';
import { appStoreLink } from '@/screens/init/AppVersion';

type SettingMenuItemProps = {
  settingMenu: object;
  appVersion?: object;
};

export function SettingMenuItem({
  settingMenu,
  appVersion,
}: SettingMenuItemProps): React.JSX.Element {
  const navigation = useNavigation();

  const handleButtonPress = (menu: object) => {
    let headerTitle = '';

    if (menu?.key === 'version') {
      return;
    }

    menu?.key === 'sendFeedback' ? headerTitle : (headerTitle = menu?.title);

    navigation.navigate('SettingModal', {
      headerTitle,
      menu,
    });
  };

  return (
    <View style={styles.container}>
      <AppButton
        text={settingMenu?.title}
        textStyle={styles.title}
        onPressButton={() => handleButtonPress(settingMenu)}
      />
      {settingMenu?.key === 'version' && (
        <View style={styles.row}>
          <AppText style={styles.infoText}>{appVersion?.version}</AppText>
          <AppButton
            text="업데이트"
            textStyle={styles.infoText}
            buttonStyle={styles.updateButton}
            onPressButton={() => {
              Linking.openURL(appStoreLink)
            }}
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
    alignItems: 'center',
    paddingVertical: 8,
    gap: 10,
  },
  title: {
    flex: 1,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: getFontSize(14),
    fontWeight: font.fontWeight.medium,
    lineHeight: 16.71,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey400,
  },
  updateButton: {
    borderBottomWidth: 1,
    borderColor: color.grey.grey400,
  },
});
