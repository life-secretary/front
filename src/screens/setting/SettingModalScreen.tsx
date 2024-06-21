import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import {AppLayout} from '@/components/common/AppLayout';
import {AppText} from '@/components/common/AppText';
import {MyInfoMenu} from '@/components/setting/my/MyInfoMenu';
import {SendFeedbackForm} from '@/components/setting/sendFeedback/SendFeedbackForm';
import {Notice} from '@/components/setting/notice/Notice';
import {OpenSourceList} from '@/components/setting/openSource/OpenSourceList';
import {Empty} from '@/components/setting/Empty';
import {font} from '@/styles/font';
import color from '@/styles/color';
import spacing from '@/styles/spacing';

import {getFontSize} from '@/utils/font';
import {ServiceIntro} from '@/components/setting/ServiceIntro';
import { Terms } from '@/components/setting/Terms';
import { Privacy } from '@/components/setting/Privacy';

export function SettingModalScreen({
  route,
  navigation,
}: any): React.JSX.Element {
  const {headerTitle, menu} = route.params;

  const renderComponent = (menuName: string) => {
    switch (menuName) {
      case 'my':
        return <MyInfoMenu />;
      case 'sendFeedback':
        return <SendFeedbackForm />;
      case 'notice':
        return <Notice />;
      case 'openSource':
        return <OpenSourceList />;
      case 'serviceIntro':
        return <ServiceIntro />;
      case 'privacy':
        return <Privacy />;
      case 'service':
        return <Terms />;
      default:
        return <Empty />;
    }
  };

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
      {renderComponent(menu?.key)}
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
    paddingLeft: spacing.layoutPaddingHorizontal,
  },
  divider: {
    backgroundColor: color.grey.grey100,
    height: 1,
  },
});
