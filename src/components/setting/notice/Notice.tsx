import React, {useEffect, useState} from 'react';

import {fetchData} from '@/api/api';

import {ScrollView, StyleSheet, View} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import AppIcon from '@/components/common/AppIcon';
import {AppText} from '@/components/common/AppText';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

import {getFormattedDate} from '@/utils';
import {getFontSize} from '@/utils/font';

const EmptyList = () => (
  <View style={styles.emptyListContainer}>
    <View style={styles.textContainer}>
      <AppText style={styles.text}>최근 6개월간 공지된 내용이 없습니다</AppText>
      <AppText style={styles.subText}>(지난 공지는 삭제됩니다)</AppText>
    </View>
  </View>
);

export function Notice(): React.JSX.Element {
  const [noticeList, setNoticeList] = useState([]);
  const [activeNotices, setActiveNotices] = useState([0]);
  const activeNoticeIndex = activeNotices[0];

  // TODO: notice 날짜 데이터 필요
  const renderNoticeHeader = (notice: object) => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <AppText style={styles.headerTitle}>{notice?.title}</AppText>
        {noticeList.indexOf(notice) === activeNoticeIndex ? (
          <AppIcon name="arrowUp" width={36} height={36} />
        ) : (
          <AppIcon name="arrowDown" width={36} height={36} />
        )}
      </View>
      <AppText style={styles.headerText}>
        {getFormattedDate(new Date(notice?.createdAt), '.') || '-'}
      </AppText>
    </View>
  );

  const renderNoticeContent = (notice: object) => (
    <View style={styles.content}>
      <AppText style={styles.contentText}>{notice?.message}</AppText>
    </View>
  );

  const handleActiveNotice = (notices: []) => {
    setActiveNotices(notices);
  };

  useEffect(() => {
    const fetchNoticeList = async () => {
      const res = await fetchData('/notice', null);
      const list = res.data.data;

      if (res.status === 200) {
        setNoticeList(list);
      }
    };

    fetchNoticeList();
  }, []);

  return (
    <View style={styles.container}>
      {noticeList.length > 0 ? (
        <ScrollView>
          <Accordion
            sections={noticeList}
            activeSections={activeNotices}
            renderHeader={renderNoticeHeader}
            renderContent={renderNoticeContent}
            underlayColor="none"
            onChange={handleActiveNotice}
          />
        </ScrollView>
      ) : (
        <EmptyList />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: color.grey.grey100,
    paddingVertical: 12,
    backgroundColor: color.main.white,
    paddingHorizontal: spacing.layoutPaddingHorizontal,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: getFontSize(14),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 22,
    color: color.grey.grey700,
  },
  headerText: {
    paddingVertical: 4,
    fontSize: getFontSize(14),
    fontWeight: font.fontWeight.medium,
    lineHeight: 16.71,
    color: color.grey.grey400,
  },
  content: {
    paddingHorizontal: spacing.layoutPaddingHorizontal,
    paddingVertical: 22,
    backgroundColor: color.grey.grey100,
  },
  contentText: {
    fontSize: getFontSize(14),
    fontWeight: font.fontWeight.medium,
    lineHeight: 21,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey500,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 280,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontWeight: font.fontWeight.medium,
    color: color.grey.grey500,
  },
  subText: {
    fontWeight: font.fontWeight.medium,
    color: color.grey.grey400,
  },
});
