import React, {useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {userInfoState} from '@/store/userInfoState';
import {categoryListState, mainCategoryListState} from '@/store/categoryState';
import {scrapListState} from '@/store/scrapState';
import {fetchData} from '@/api/api';

import type {CategoryObject} from '../models/common';

import {StyleSheet, ScrollView, View} from 'react-native';
import {AppLayout} from '@/components/common/AppLayout';
import {AppHeader} from '@/components/common/AppHeader';
import {AppTitle} from '@/components/common/AppTitle';
import AppIcon from '@/components/common/AppIcon';
import {HomeCategoryList} from '@/components/home/HomeCategoryList';
import {HomeContentsListWithFilter} from '@/components/home/homeContents/HomeContentsListWithFilter';
import {HomeImageCarousel} from '@/components/home/HomeImageCarousel';
import {HomeContentsList} from '@/components/home/homeContents/HomeContentsList';
import {SendFeedbackButton} from '@/components/home/SendFeedbackButton';
import Login from './init/Login';
import SearchCategoryModal from '@/components/search/SearchCategoryModal';
import ContentModal from '@/components/contentDetail/ContentModal';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {generateRandomId, getFormattedDate} from '@/utils';

const DUMMY_CAROUSEL_DATA = [
  {
    id: 'c1',
    tag: '경제',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('@/assets/images/carouselPlaceholder.jpg'),
  },
  {
    id: 'c2',
    tag: '부동산',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('@/assets/images/carouselPlaceholder.jpg'),
  },
  {
    id: 'c3',
    tag: '건강',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('@/assets/images/carouselPlaceholder.jpg'),
  },
  {
    id: 'c4',
    tag: '기타',
    title: '2024년 달라지는 것들\n알아보기',
    thumbnail: require('@/assets/images/carouselPlaceholder.jpg'),
  },
];

const DUMMY_LIST = [
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: {category: 'economy', title: '경제'},
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    createdDate: '2024-01-01',
  },
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: {category: 'economy', title: '경제'},
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    createdDate: '2024-01-11',
  },
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: {category: 'economy', title: '경제'},
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    createdDate: '2024-02-05',
  },
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: {category: 'economy', title: '경제'},
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    createdDate: '2024-02-22',
  },
  {
    id: generateRandomId(),
    title: '이곳은 콘텐츠의 제목 영역으로 최대 24자까지 노출됩니다.',
    category: {category: 'economy', title: '경제'},
    thumbnail: require('@/assets/images/thumbnailPlaceholder.jpg'),
    createdDate: '2024-03-01',
  },
];

export function HomeScreen(): React.JSX.Element {
  const mainCategories = useRecoilValue(mainCategoryListState);
  const HOME_CATEGORIES = [
    {id: generateRandomId(), category: 'all', title: '전체'},
    ...mainCategories,
    {id: generateRandomId(), category: 'etc', title: '기타'},
  ];

  // TODO: API 연동과 파라미터 넘기는 작업은 추후 작업. 현재는 워크플로우만 확인할 수 있게끔 작업.
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);
  const setCategories = useSetRecoilState(categoryListState);
  const setScrapList = useSetRecoilState(scrapListState);
  const userInfo = useRecoilValue(userInfoState);
  // Login → Agreement → Survey 과정 임시 테스팅 중
  const [isDone, setIsDone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(HOME_CATEGORIES[0]);
  const [newestHomeContentsList, setNewestHomeContentsList] = useState([]);

  const openCategoryModal = (category: CategoryObject) => {
    setSelectedCategory(category);
    setIsCategoryModalVisible(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalVisible(false);
  };

  const openContentModal = () => {
    setIsContentModalVisible(true);
  };

  const closeContentModal = () => {
    setIsContentModalVisible(false);
  };

  const closeAllProcess = () => {
    setIsDone(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetchData('/categories', null);
      if (res.status === 200) {
        setCategories(res.data.data);
      }
    };

    const fetchScrapList = async () => {
      const res = await fetchData('/scrap', {
        userId: userInfo.id,
      });
      const list = res.data.data;

      if (res.status === 200) {
        setScrapList(list);
      }
    };

    const fetchHomeContentsListByNewest = async () => {
      const res = await fetchData('/content', {sort: 'createdAt'});
      const list = res.data.data.content;

      if (res.status === 200) {
        setNewestHomeContentsList(list);
      }
    };

    fetchCategories();
    fetchScrapList();
    fetchHomeContentsListByNewest();
  }, [setCategories, setScrapList, userInfo]);

  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader style={styles.header}>
          <AppTitle
            text={getFormattedDate(new Date(), 'kor')}
            style={styles.headerTitle}
          />
          <View style={styles.headerIconContainer}>
            <AppIcon name="notificationOn" width={42} height={42} />
            <AppIcon name="balancer" width={42} height={42} />
          </View>
        </AppHeader>
        <View style={styles.section}>
          <HomeCategoryList
            categories={HOME_CATEGORIES}
            openCategoryModal={openCategoryModal}
          />
          <HomeImageCarousel
            data={DUMMY_CAROUSEL_DATA}
            openContentModal={openContentModal}
          />
          <HomeContentsList
            isUsernameUsed={true}
            title={'유사한 사용자가 읽고 있어요'}
            list={DUMMY_LIST}
          />
          <HomeContentsListWithFilter
            categories={HOME_CATEGORIES}
            list={DUMMY_LIST}
            title={'인기 많은 콘텐츠'}
          />
          <HomeContentsList
            title={'최근 업데이트 되었어요'}
            list={newestHomeContentsList}
          />
        </View>
        <View style={styles.footer}>
          <AppTitle
            text="인생비서 팀에게 자유롭게 얘기해주세요"
            style={styles.footerText}
          />
          <SendFeedbackButton />
        </View>
      </ScrollView>
      {/* <Login isVisible={!isDone} closeAllProcess={closeAllProcess} /> */}
      <SearchCategoryModal
        isVisible={isCategoryModalVisible}
        closeCategoryModal={closeCategoryModal}
        categories={HOME_CATEGORIES}
        selectedCategory={selectedCategory}
      />
      <ContentModal
        isVisible={isContentModalVisible}
        closeContentModal={closeContentModal}
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerIconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: font.fontWeight.bold,
    lineHeight: 21.48,
    color: color.grey.grey500,
  },
  section: {
    gap: 34,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 34,
    gap: 18,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 21,
    color: color.grey.grey400,
  },
});
