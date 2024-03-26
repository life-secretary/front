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

// 유사한 사용자가 조회한 콘텐츠 리스트 데이터

// 인기 많은 콘텐츠 리스트 데이터

// 최근 업데이트된 콘텐츠 리스트 데이터

import SearchCategoryModal from '../components/search/SearchCategoryModal';

const DUMMY_CAROUSEL_DATA = [
  {
    id: 'c1',
    tag: '경제',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: 'c2',
    tag: '부동산',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: 'c3',
    tag: '건강',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('../assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: 'c4',
    tag: '기타',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('../assets/images/thumbnailPlaceholder.jpg'),
  },
];

export function HomeScreen(): React.JSX.Element {
  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader>
          <HomeTitle text="2024년 01월 14일" style={styles.dateText} />
        </AppHeader>
        <HomeCategoryList />
        <HomeImageCarousel data={DUMMY_CAROUSEL_DATA} />
        <HomeContentsList titleText={'유사한 사용자가 읽고 있어요'} />
        <HomeContentsListWithFilter titleText={'인기 많은 콘텐츠'} />
        <HomeContentsList titleText={'최근 업데이트 되었어요'} />
        <View style={styles.sendQuestioncontainer}>
          <HomeTitle
            text="인생비서 팀에게 자유롭게 얘기해주세요"
            style={styles.sendQuestionText}
          />
          <SendQuestionButton />
        </View>
      </ScrollView>
      <SearchCategoryModal isVisible={false} />
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
