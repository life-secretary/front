import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useQueries} from '@tanstack/react-query';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {userInfoState} from '@/store/userInfoState';
import {categoryListState, homeCategoryListState} from '@/store/categoryState';
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
import AppConfirmModal from '@/components/common/modal/AppConfirmModal';
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

export function HomeScreen({navigation}: any): React.JSX.Element {
  // TODO: API 연동과 파라미터 넘기는 작업은 추후 작업. 현재는 워크플로우만 확인할 수 있게끔 작업.
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [isContentModalVisible, setIsContentModalVisible] = useState(false);
  const setCategoryList = useSetRecoilState(categoryListState);
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

  // 콘텐츠 상세 조회
  const [content, setContent] = useState<any>({});
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [confirmData, setConfirmData] = useState<any>({});

  const HOME_CONTENT_SIZE = 5;

  const scrollViewRef = useRef(null);

  const fetchCategories = async () => {
    const res = await fetchData('/categories', null);

    return res.data.data;
  };

  const fetchOccupations = async () => {
    const res = await fetchData('/occupation', {});

    return res.data.data;
  };

  // TODO: login middleware에서 처리하도록 수정
  const fetchScraps = async () => {
    const res = await fetchData('/scrap', {
      userId: userInfo.id,
    });

    return res.data.data;
  };

  const fetchHomeContentsByNewest = async () => {
    const res = await fetchData('/content', {
      sort: 'createdAt',
      size: HOME_CONTENT_SIZE,
    });

    return res.data.data.content;
  };

  const fetchHomeCarouselContents = async () => {
    const res = await fetchData('/content/main', {});

    return res.data.data;
  };

  const fetchHomeContentsReadBySimilarUsers = async () => {
    const res = await fetchData('/content/similar-users/reads', {
      userId: userInfo.id,
    });

    return res.data.data;
  };

  const combinedQueries = useQueries({
    queries: [
      {
        queryKey: ['categories'],
        queryFn: fetchCategories,
      },
      {
        queryKey: ['occupations'],
        queryFn: fetchOccupations,
      },
      {
        queryKey: ['scraps'],
        queryFn: fetchScraps,
      },
      {
        queryKey: ['newestHomeContents'],
        queryFn: fetchHomeContentsByNewest,
      },
      {
        queryKey: ['homeCarouselContents'],
        queryFn: fetchHomeCarouselContents,
      },
      {
        queryKey: ['homeContentsReadBySimilarUsers'],
        queryFn: fetchHomeContentsReadBySimilarUsers,
      },
    ],
    combine: results => {
      return {
        data: results.map(result => result.data),
        isLoading: results.some(result => result.isLoading),
        error: results.some(result => result.error),
      };
    },
  });

  const {error, isLoading} = combinedQueries;

  if (error && !isLoading) {
    throw error;
  }

  const [
    categories,
    occupations,
    scraps,
    newestHomeContents,
    homeCarouselContents,
    homeContentsReadBySimilarUsers,
  ] = combinedQueries.data;

  const openCategoryModal = (category: CategoryObject) => {
    setSelectedCategory(category);
    setIsCategoryModalVisible(true);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalVisible(false);
  };

  const openContentModal = (id: any) => {
    fetchData(`/content/${id}`, {})
      .then((response) => {
        const { data : { data } } = response;

        setContent(data);
        setIsContentModalVisible(true);
      })
      .catch((error) => {
        console.log('콘텐츠 fetch 에러', error);
        setConfirmData({
          title: '400 에러',
          description: '해당 컨텐츠는 존재하지 않습니다',
          button: {
            first: {
              text: '닫기',
              onPressButton: () => {
                console.log('닫기');
                setIsConfirmOpen(false);
              }
            }
          }
        });
        setIsConfirmOpen(true);
      });
  };

  const closeContentModal = () => {
    setIsContentModalVisible(false);
  };

  const closeAllProcess = () => {
    setIsDone(true);
  };

  useEffect(() => {
    if (categories) {
      setCategoryList(categories);
    }

    if (occupations) {
      setOccupationList(occupations);
    }

    if (scraps) {
      setScrapList(scraps);
    }

    if (newestHomeContents) {
      setNewestHomeContentList(newestHomeContents);
    }

    if (homeCarouselContents) {
      setHomeCarouselContentList(homeCarouselContents);
    }

    if (homeContentsReadBySimilarUsers) {
      setHomeContentListReadBySimilarUsers(homeContentsReadBySimilarUsers);
    }
  }, [
    categories,
    homeCarouselContents,
    homeContentsReadBySimilarUsers,
    newestHomeContents,
    occupations,
    scraps,
    setCategoryList,
    setHomeCarouselContentList,
    setHomeContentListReadBySimilarUsers,
    setNewestHomeContentList,
    setOccupationList,
    setScrapList,
  ]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = navigation.addListener('tabPress', e => {
        e.preventDefault();
        scrollViewRef?.current.scrollTo({y: 0, animated: true});
      });

      return unsubscribe;
    }, [navigation]),
  );

  return (
    <AppLayout style={styles.layout}>
      {/* FIXME: ScrollView와 FlatList를 중첩해서 사용하면 'VirtuallizedLists should never be nested...' 관련 에러 발생 */}
      {/* 현재 구조에서 FlatList 컴포넌트로 변경하면 HomeImageCarousel에 적용된 gesture handler가 동작하지 않는 부작용이 발생하기 때문에
          일단 ScrollView를 유지하고 추후 FlatList로 변경하면서 carousel 라이브러리 교체 필요
       */}
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
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
          <HomeCategoryList
            isLoading={isLoading}
            openCategoryModal={openCategoryModal}
          />
          <HomeImageCarousel
            data={homeCarouselContentList}
            openContentModal={openContentModal}
          />
          <HomeContentList
            isLoading={isLoading}
            isUsernameUsed={true}
            title={'유사한 사용자가 읽고 있어요'}
            list={homeContentListReadBySimilarUsers}
          />
          <HomeContentListWithFilter title={'인기 많은 콘텐츠'} />
          <HomeContentList
            isLoading={isLoading}
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
        content={content}
        isVisible={isContentModalVisible}
        closeContentModal={closeContentModal}
      />
      <AppConfirmModal 
        isVisible={isConfirmOpen}
        title={confirmData.title ? confirmData.title : ''}
        description={confirmData.description ? confirmData.description : ''}
        button={confirmData.button ? confirmData.button : {
          first: {
            text: '',
            textStyle: {},
            buttonStyle: {},
            onPressButton: () => {},
          }
        }}
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: color.grey.grey100,
  },
  header: {
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 12, // 아이콘이 있는 헤더
    marginBottom: 24,
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
