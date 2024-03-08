import * as React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {HomeCategoryList} from '../components/home/HomeCategoryList';
import {HomeContentsListWithFilter} from '../components/home/homeContents/HomeContentsListWithFilter';
import {HomeImageCarousel} from '../components/home/HomeImageCarousel';
import {HomeContentsList} from '../components/home/homeContents/HomeContentsList';
import {SendQuestionButton} from '../components/home/SendQuestionButton';
import {HomeTitle} from '../components/home/HomeTitle';

export function HomeScreen(): React.JSX.Element {
  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader>
          <HomeTitle text="2024년 01월 14일" style={styles.dateText} />
        </AppHeader>
        <HomeCategoryList />
        <HomeImageCarousel />
        <HomeContentsList
          isUsernameUsed={true}
          title={'유사한 사용자가 읽고 있어요'}
        />
        <HomeContentsListWithFilter title={'인기 많은 콘텐츠'} />
        <HomeContentsList title={'최근 업데이트 되었어요'} />
        <View style={styles.sendQuestioncontainer}>
          <HomeTitle
            text="인생비서 팀에게 자유롭게 얘기해주세요"
            style={styles.sendQuestionText}
          />
          <SendQuestionButton />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  sendQuestioncontainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 34,
    borderWidth: 1,
    gap: 18,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#526070',
  },
  sendQuestionText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: '#A1ACB9',
  },
});
