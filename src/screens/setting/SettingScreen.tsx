import React from 'react';

import {StyleSheet, View} from 'react-native';
import {AppLayout} from '@/components/common/AppLayout';
import {AppHeader} from '@/components/common/AppHeader';
import {AppTitle} from '@/components/common/AppTitle';
import AppIcon from '@/components/common/AppIcon';
import {MyInfoSection} from '@/components/setting/my/MyInfoSection';
import {SettingMenu} from '@/components/setting/SettingMenu';
import color from '@/styles/color';
import {font} from '@/styles/font';

const DUMMY_USER = {
  userId: '1',
  nickname: '홍길동',
  birthdate: '2002-09-10',
};

const MY_MENU = {
  key: 'my',
  title: '내 정보',
};

const SETTING_MENU_LIST = [
  [
    {
      key: 'notice',
      title: '공지사항',
    },
    {
      key: 'sendFeedback',
      title: '1:1 문의',
    },
  ],
  [
    {
      key: 'privacy',
      title: '개인정보 처리방침',
    },
    {
      key: 'service',
      title: '서비스 이용약관',
    },
    {
      key: 'openSource',
      title: '오픈소스 라이선스',
    },
    {
      key: 'version',
      title: '버전 정보',
    },
  ],
  [
    {
      key: 'serviceIntro',
      title: '서비스 소개',
    },
    {
      key: 'creatorIntro',
      title: '제작자 소개',
    },
  ],
];

export function SettingScreen(): React.JSX.Element {
  return (
    <AppLayout style={styles.layout}>
      <AppHeader style={styles.header}>
        <AppTitle text="관리" style={styles.headerTitle} />
        <View style={styles.headerIconContainer}>
          <AppIcon name="notificationOn" width={42} height={42} />
        </View>
      </AppHeader>
      <View style={styles.container}>
        <View style={styles.section}>
          <MyInfoSection user={DUMMY_USER} settingMenu={MY_MENU} />
        </View>
        <SettingMenu settingMenuList={SETTING_MENU_LIST[0]} />
        <View style={styles.divider} />
        <SettingMenu settingMenuList={SETTING_MENU_LIST[1]} />
        <View style={styles.divider} />
        <SettingMenu settingMenuList={SETTING_MENU_LIST[2]} />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: color.main.white,
  },
  header: {
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: font.fontWeight.bold,
    lineHeight: 23.87,
    color: color.grey.grey700,
  },
  headerIconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  container: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  divider: {
    backgroundColor: color.grey.grey100,
    height: 1,
  },
});
