import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import {AppLayout} from '@/components/common/AppLayout';
import {AppText} from '@/components/common/AppText';
import {MyInfoMenu} from '@/components/setting/my/MyInfoMenu';
import {SendFeedbackForm} from '@/components/setting/sendFeedback/SendFeedbackForm';
import {Notice} from '@/components/setting/notice/Notice';
import {font} from '@/styles/font';
import color from '@/styles/color';
import spacing from '@/styles/spacing';

export function SettingModalScreen({
  route,
  navigation,
}: any): React.JSX.Element {
  const {headerTitle, menu} = route.params;

  return (
    <AppLayout>
      <AppHeader style={styles.header}>
        <View style={styles.button}>
          <AppIcon
            name="back"
            width={42}
            height={42}
            onPress={() => navigation.goBack()}
          />
        </View>
        {headerTitle && (
          <View>
            <AppText style={styles.headerTitle}>{headerTitle}</AppText>
          </View>
        )}
      </AppHeader>
      {menu?.key !== 'sendFeedback' && <View style={styles.divider} />}
      {menu?.key === 'my' && <MyInfoMenu />}
      {menu?.key === 'sendFeedback' && <SendFeedbackForm />}
      {menu?.key === 'notice' && <Notice />}
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
    fontSize: 20,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 23.87,
    color: color.grey.grey700,
  },
  button: {
    position: 'absolute',
    left: 0,
    paddingLeft: spacing.layoutPaddingHorizontal,
  },
  divider: {
    backgroundColor: color.grey.grey100,
    height: 1,
  },
});
