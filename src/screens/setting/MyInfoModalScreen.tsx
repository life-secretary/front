import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import {AppLayout} from '@/components/common/AppLayout';
import {AppText} from '@/components/common/AppText';
import {MyInfoEditForm} from '@/components/setting/my/MyInfoEditForm';
import {MyInfoWithdrawalForm} from '@/components/setting/my/MyInfoWithdrawalForm';
import {font} from '@/styles/font';
import color from '@/styles/color';

import {getFontSize} from '@/utils/font';

export function MyInfoModalScreen({route, navigation}: any): React.JSX.Element {
  const {headerTitle, menu} = route.params;

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <AppLayout isUsedPadding={false}>
      <AppHeader style={styles.header}>
        <View style={styles.button}>
          <AppIcon
            name="back"
            width={42}
            height={42}
            onPress={handleBackButtonPress}
          />
        </View>
        {headerTitle && (
          <View>
            <AppText style={styles.headerTitle}>{headerTitle}</AppText>
          </View>
        )}
      </AppHeader>
      <View style={styles.divider} />
      {menu?.key === 'edit' && <MyInfoEditForm />}
      {menu?.key === 'withdrawal' && <MyInfoWithdrawalForm />}
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 42,
    marginTop: 12,
    marginBottom: 8,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: getFontSize(20),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 23.87,
    color: color.grey.grey700,
  },
  button: {
    position: 'absolute',
    left: 0,
    paddingLeft: 24,
  },
  divider: {
    backgroundColor: color.grey.grey100,
    height: 1,
  },
});
