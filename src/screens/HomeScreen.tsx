import React, {useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {userInfoState} from '@/store/userInfoState';
import {
  categoryListState,
  homeCategoryListState,
  mainCategoryListState,
} from '@/store/categoryState';
import {occupationListState} from '@/store/occupation';
import {scrapListState} from '@/store/scrapState';
import {
  homeCarouselContentListState,
  homeContentListReadBySimilarUsersState,
  newestHomeContentListState,
} from '@/store/homeContentState';
import {fetchData} from '@/api/api';

import type {CategoryObject, OccupationObject} from '../models/common';

import {StyleSheet, ScrollView, View} from 'react-native';
import {AppLayout} from '@/components/common/AppLayout';
import {AppHeader} from '@/components/common/AppHeader';
import {AppTitle} from '@/components/common/AppTitle';
import AppIcon from '@/components/common/AppIcon';
import {HomeCategoryList} from '@/components/home/HomeCategoryList';
import {HomeContentListWithFilter} from '@/components/home/homeContent/HomeContentListWithFilter';
import {HomeImageCarousel} from '@/components/home/HomeImageCarousel';
import {HomeContentList} from '@/components/home/homeContent/HomeContentList';
import {SendFeedbackButton} from '@/components/home/SendFeedbackButton';
import Login from './init/Login';
import SearchCategoryModal from '@/components/search/SearchCategoryModal';
import ContentModal from '@/components/contentDetail/ContentModal';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFormattedDate} from '@/utils';
import {getFontSize} from '@/utils/font';

import {HOME_CONTENT_SIZE} from '@/constants';

const DUMMY_CAROUSEL_LIST = [
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

export function HomeScreen(): React.JSX.Element {
  // TODO: API 연동과 파라미터 넘기는 작업은 추후 작업. 현재는 워크플로우만 확인할 수 있게끔 작업.
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);
  const setCategories = useSetRecoilState(categoryListState);
  const setOccupationList = useSetRecoilState(occupationListState);
  const setScrapList = useSetRecoilState(scrapListState);
  const homeCategories = useRecoilValue(homeCategoryListState);
  const userInfo = useRecoilValue(userInfoState);
  // Login → Agreement → Survey 과정 임시 테스팅 중
  const [isDone, setIsDone] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(homeCategories[0]);
  const [newestHomeContentList, setNewestHomeContentList] = useRecoilState(
    newestHomeContentListState,
  );
  const [homeCarouselContentList, setHomeCarouselContentList] = useRecoilState(
    homeCarouselContentListState,
  );
  const [
    homeContentListReadBySimilarUsers,
    setHomeContentListReadBySimilarUsers,
  ] = useRecoilState(homeContentListReadBySimilarUsersState);

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
      try {
        const res = await fetchData('/categories', null);
        if (res.status === 200) {
          setCategories(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchOccupations = async () => {
      try {
        const res = await fetchData('/occupation', {});
        if (res.status === 200) {
          setOccupationList(res.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchScrapList = async () => {
      try {
        const res = await fetchData('/scrap', {
          userId: userInfo.id,
        });
        const list = res.data.data;

        if (res.status === 200) {
          setScrapList(list);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchHomeContentListByNewest = async () => {
      try {
        const res = await fetchData('/content', {
          sort: 'createdAt',
          size: HOME_CONTENT_SIZE,
        });
        const list = res.data.data.content;

        if (res.status === 200) {
          setNewestHomeContentList(list);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchHomeCarouselContentList = async () => {
      try {
        const res = await fetchData('/content/main', {});
        const list = res.data.data;

        if (res.status === 200) {
          setHomeCarouselContentList(list);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchHomeContentListReadBySimilarUsers = async () => {
      try {
        const res = await fetchData('/content/similar-users/reads', {
          userId: userInfo.id,
        });

        const list = res.data.data;

        if (res.status === 200) {
          setHomeContentListReadBySimilarUsers(list);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
    fetchOccupations();
    fetchScrapList();
    fetchHomeContentListByNewest();
    fetchHomeCarouselContentList();
    fetchHomeContentListReadBySimilarUsers();
  }, [
    setCategories,
    setHomeCarouselContentList,
    setHomeContentListReadBySimilarUsers,
    setNewestHomeContentList,
    setOccupationList,
    setScrapList,
    userInfo,
  ]);

  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader style={styles.header}>
          <AppTitle
            text={getFormattedDate(new Date(), 'kor')}
            style={styles.headerTitle}
          />
          <View style={styles.headerIconContainer}>
            {/* TODO: 알림 기능 2차 개발 예정 */}
            {/* <AppIcon name="notificationOn" width={42} height={42} /> */}
            <AppIcon name="balancer" width={42} height={42} />
          </View>
        </AppHeader>
        <View style={styles.section}>
          <HomeCategoryList openCategoryModal={openCategoryModal} />
          <HomeImageCarousel
            data={
              homeCarouselContentList.length > 0
                ? homeCarouselContentList
                : DUMMY_CAROUSEL_LIST
            }
            openContentModal={openContentModal}
          />
          <HomeContentList
            isUsernameUsed={true}
            title={'유사한 사용자가 읽고 있어요'}
            list={homeContentListReadBySimilarUsers}
          />
          <HomeContentListWithFilter title={'인기 많은 콘텐츠'} />
          <HomeContentList
            title={'최근 업데이트 되었어요'}
            list={newestHomeContentList}
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
    marginTop: 12, // 아이콘이 있는 헤더
  },
  headerIconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  headerTitle: {
    height: 24,
    fontSize: getFontSize(18),
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
    paddingBottom: 60,
  },
  footerText: {
    textAlign: 'center',
    fontSize: getFontSize(15),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 21,
    color: color.grey.grey400,
  },
});
