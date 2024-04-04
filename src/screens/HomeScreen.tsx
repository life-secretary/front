import * as React from 'react';

import {StyleSheet, ScrollView, View} from 'react-native';
import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {HomeCategoryList} from '../components/home/HomeCategoryList';
import {HomeContentsListWithFilter} from '../components/home/homeContents/HomeContentsListWithFilter';
import {HomeImageCarousel} from '../components/home/HomeImageCarousel';
import {HomeContentsList} from '../components/home/homeContents/HomeContentsList';
import {SendQuestionButton} from '../components/home/SendQuestionButton';
import {AppTitle} from '../components/common/AppTitle';

// 유사한 사용자가 조회한 콘텐츠 리스트 데이터

// 인기 많은 콘텐츠 리스트 데이터

// 최근 업데이트된 콘텐츠 리스트 데이터

import SearchCategoryModal from '../components/search/SearchCategoryModal';
import AppIcon from '@/components/common/AppIcon';
import {getFormattedDate} from '@/utils';
import color from '@/styles/color';

const DUMMY_CAROUSEL_DATA = [
  {
    id: 'c1',
    tag: '경제',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: 'c2',
    tag: '부동산',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: 'c3',
    tag: '건강',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
  },
  {
    id: 'c4',
    tag: '기타',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
  },
];

export function HomeScreen(): React.JSX.Element {

  // TODO: API 연동과 카테고리 id 넘기는 작업은 추후 작업. 현재는 워크플로우만 확인할 수 있게끔 작업.
  const [isCategoryModalVisible, setIsCategoryModalVisible] = React.useState(false);

  const openCategoryModal = (category: string) => {
    // console.log(category);
    setIsCategoryModalVisible(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalVisible(false);
  };

  return (
    <AppLayout style={styles.layout}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader style={styles.header}>
          <AppTitle
            text={getFormattedDate(new Date(), 'kor')}
            style={styles.headerTitle}
          />
          <View style={styles.headerIconContainer}>
            <AppIcon
              name="notificationOn"
              width={42}
              height={42}
            />
            <AppIcon name="balancer" width={42} height={42} />
          </View>
        </AppHeader>
        <HomeCategoryList 
          openCategoryModal={openCategoryModal}
        />
        <HomeImageCarousel data={DUMMY_CAROUSEL_DATA} />
        <HomeContentsList
          isUsernameUsed={true}
          title={'유사한 사용자가 읽고 있어요'}
        />
        <HomeContentsListWithFilter title={'인기 많은 콘텐츠'} />
        <HomeContentsList title={'최근 업데이트 되었어요'} />
        <View style={styles.footer}>
          <AppTitle
            text="인생비서 팀에게 자유롭게 얘기해주세요"
            style={styles.footerText}
          />
          <SendQuestionButton />
        </View>
      </ScrollView>
      <SearchCategoryModal 
        isVisible={isCategoryModalVisible}
        closeCategoryModal={closeCategoryModal}
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: color.white,
  },
  header: {
    justifyContent: 'space-between',
  },
  headerIconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 34,
    gap: 18,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: color.grey500,
    lineHeight: 21.48,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    color: color.grey400,
  },
});
