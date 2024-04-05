import React, {useState} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import AppIcon from '@/components/common/AppIcon';
import {AppText} from '@/components/common/AppText';
import Accordion from 'react-native-collapsible/Accordion';
import color from '@/styles/color';
import {font} from '@/styles/font';

const EmptyList = () => (
  <View style={styles.emptyListContainer}>
    <View style={styles.textContainer}>
      <AppText style={styles.text}>최근 6개월간 공지된 내용이 없습니다</AppText>
      <AppText style={styles.subText}>(지난 공지는 삭제됩니다)</AppText>
    </View>
  </View>
);

export function Notice(): React.JSX.Element {
  const [activeNotices, setActiveNotices] = useState([0]);
  const activeNoticeIndex = activeNotices[0];

  const NOTICE_LIST = [
    {
      index: 0,
      title: '[시스템 점검] 사용불가 일자 및 시간 안내',
      createdDate: '2024.01.16',
      content:
        '안녕하세요. 인생비서 팀입니다.\n\n아래 일자와 시간에 시스템 점검이 예정되어있으며, 이로 인해 한시적으로 서비스 사용이 불가할 예정입니다.\n\n여러분들께 보다 편리하고 안전한 서비스를 제공해 드리기 위해 노력하겠습니다. 감사합니다.\n\n일자 : 2024/03/01\n시간: AM 02:00 ~ 06:00',
    },
    {
      index: 1,
      title: '[업데이트] v1.0.2 업데이트 내용 안내',
      createdDate: '2024.01.16',
      content:
        '안녕하세요. 인생비서 팀입니다.\n\n아래 일자와 시간에 시스템 점검이 예정되어있으며, 이로 인해 한시적으로 서비스 사용이 불가할 예정입니다.\n\n여러분들께 보다 편리하고 안전한 서비스를 제공해 드리기 위해 노력하겠습니다. 감사합니다.\n\n일자 : 2024/03/01\n시간: AM 02:00 ~ 06:00',
    },
    {
      index: 2,
      title: 'CS센터 운영 안내',
      createdDate: '2024.01.16',
      content:
        '안녕하세요. 인생비서 팀입니다.\n\n아래 일자와 시간에 시스템 점검이 예정되어있으며, 이로 인해 한시적으로 서비스 사용이 불가할 예정입니다.\n\n여러분들께 보다 편리하고 안전한 서비스를 제공해 드리기 위해 노력하겠습니다. 감사합니다.\n\n일자 : 2024/03/01\n시간: AM 02:00 ~ 06:00',
    },
  ];

  const renderNoticeHeader = (notice: object) => (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <AppText style={styles.headerTitle}>{notice?.title}</AppText>
        {notice?.index === activeNoticeIndex ? (
          <AppIcon name="arrowUp" width={36} height={36} />
        ) : (
          <AppIcon name="arrowDown" width={36} height={36} />
        )}
      </View>
      <AppText style={styles.headerText}>{notice?.createdDate}</AppText>
    </View>
  );

  const renderNoticeContent = (notice: object) => (
    <View style={styles.content}>
      <AppText style={styles.contentText}>{notice?.content}</AppText>
    </View>
  );

  const handleActiveNotice = (notices: []) => {
    setActiveNotices(notices);
  };

  return (
    <View style={styles.container}>
      {NOTICE_LIST.length > 0 ? (
        <ScrollView>
          <Accordion
            sections={NOTICE_LIST}
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
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 22,
    color: color.grey.grey700,
  },
  headerText: {
    paddingVertical: 4,
    fontSize: 14,
    fontWeight: font.fontWeight.medium,
    lineHeight: 16.71,
    color: color.grey.grey400,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 22,
    backgroundColor: color.grey.grey100,
  },
  contentText: {
    fontSize: 14,
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
