import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppButton from '../common/AppButton';
import {font} from '@/styles/font';
import {AppText} from '../common/AppText';
import color from '@/styles/color';
import {useNavigation} from '@react-navigation/native';

type SettingMenuItemProps = {
  settingMenu: object;
};

export function SettingMenuItem({
  settingMenu,
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
          <AppText style={styles.infoText}>1.0.1</AppText>
          <AppButton
            text="업데이트"
            textStyle={styles.infoText}
            buttonStyle={styles.updateButton}
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
    fontSize: 14,
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
