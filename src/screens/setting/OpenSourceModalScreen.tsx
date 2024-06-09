import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import {AppLayout} from '@/components/common/AppLayout';
import {AppText} from '@/components/common/AppText';
import {OpenSourceItem} from '@/components/setting/openSource/OpenSourceItem';
import {font} from '@/styles/font';
import color from '@/styles/color';

import {getFontSize} from '@/utils/font';

export function OpenSourceModalScreen({
  route,
  navigation,
}: any): React.JSX.Element {
  const {licenseInfo} = route.params;

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <AppLayout>
      <AppHeader style={styles.header}>
        <View style={styles.button}>
          <AppIcon
            name="back"
            width={42}
            height={42}
            onPress={handleBackButtonPress}
          />
        </View>
        <View>
          <AppText style={styles.headerTitle}>오픈소스 라이선스</AppText>
        </View>
      </AppHeader>
      <View style={styles.divider} />
      <OpenSourceItem {...licenseInfo} />
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
