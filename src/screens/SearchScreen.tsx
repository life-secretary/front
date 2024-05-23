import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Platform} from 'react-native';

import {AppHeader} from '../components/common/AppHeader';
import {AppText} from '../components/common/AppText';
import AppIcon from '../components/common/AppIcon';
import AppConfirmModal from '../components/common/modal/AppConfirmModal';

import SearchTextInput from '../components/search/SearchTextInput';
import SearchCondition from '../components/search/SearchCondition';
import SearchTab from '../components/search/SearchTab';
import SearchWordView from '../components/search/SearchWordView';
import SearchContentView from '../components/search/SearchContentView';
import SearchToDoView from '../components/search/SearchToDoView';

import { getFontSize } from '../utils/font';
import { getSort, getNewData, getNewConditionData } from '@/utils/search';

import { fetchData, createData } from '@/api/api';

import type { ConditionData } from '../components/search/SearchCategoryModal';

import { useRecoilState } from 'recoil';
import { recentSearchWordState, popularSearchWordState, PopularSearchWord } from '@/store/search';
import { getPopularSearchWordListQuery } from '@/api/search';
import { ToDoItem } from '@/models/Todo';

const HeaderSearchResult = ({
  data, 
  searchData,
  onPressButton,
}: any) => {
  return (
    <View style={styles.searchResultHeader}>
      <AppText style={styles.searchResultText}>
        검색 결과 {data.length}건
      </AppText>
      <SearchCondition 
        data={searchData} 
        onPressButton={onPressButton}
      />
    </View>
  );
};

const SearchScreen = () => {
  const [recentSearchItemHeight, setRecentSearchItemHeight] = useState(38);
  const [recentSearchListHeight, setRecentSearchListHeight] = useState(0);
  const [isRecentSearchListOpen, setIsRecentSearchListOpen] = useState(false);

  const isLoading = useRef<boolean>(false);

  const [tabData, setTabData] = useState([
    {id: 1, text: '콘텐츠', isPressed: true},
    {id: 2, text: '할 일', isPressed: false},
  ]);

  // 검색
  const [searchText, setSearchText] = useState('');

  // content
  const pageContent = useRef<number>(0);
  const [searchConditionContentData, setSearchConditionContentData] = useState<Array<ConditionData>>([
    {text: '조회순', type: 'viewCount', orderType: 'desc', isSelected: true},
    {text: '저장순', type: 'scrapCount', orderType: 'desc', isSelected: false},
    {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
  ]);
  const [contentData, setContentData] = useState([]);

  // todo
  const pageToDo = useRef<number>(0);
  const [searchConditionToDoData, setSearchConditionToDoData] = useState<Array<ConditionData>>([
    {text: '조회순', type: 'viewCount', orderType: 'desc', isSelected: true},
    {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
  ]);
  const [toDoData, setToDoData] = useState([]);

  // 최근 검색어
  const [recentSearchData, setRecentSearchesData] = useRecoilState(recentSearchWordState);
  
  // 인기 검색어
  const [popularSearchData, setPopularSearchData] = useRecoilState(popularSearchWordState);
  const { 
    data:popularSearchWordList, 
    isSuccess:isPopularSearchWordListSuccess,
    isFetched:isPopularSearchWordListFetched,
    isRefetching:isPopularSearchWordListRefetching,
  } = getPopularSearchWordListQuery();

  const initPopularSearchData = () => {
    if (!isPopularSearchWordListFetched || !isPopularSearchWordListSuccess || !popularSearchWordList) {
      return;
    }

    const data = popularSearchWordList
      .sort((prev: PopularSearchWord, curr: PopularSearchWord) => curr.searchCount - prev.searchCount)
      .slice(0, 10);

    setPopularSearchData(data);
  };

  const currentContentSort = () => {
    return getSort(searchConditionContentData);
  };

  const currentToDoSort = () => {
    return getSort(searchConditionToDoData);
  };

  const onPressTab = (number: number) => {
    setTabData((previousValue) => {
      return previousValue.map((item, index) => {
        if (number === index) {
          item.isPressed = true;
        } else {
          item.isPressed = false;
        }

        return item;
      });
    });
  };

  // content condition
  const onPressContentViewConditionButton = (data: ConditionData, index: number): void => {
    setSearchConditionContentData((previousValue) => {
      const contentSort = [previousValue[index].type, previousValue[index].orderType];

      pageContent.current = 0;
      setContentData([]);
      fetchContent({
        contentSort,
      });

      return getNewConditionData(previousValue, index);
    });
  };

  // todo condition
  const onPressToDoViewConditionButton = (data: ConditionData, index: number): void => {
    setSearchConditionToDoData((previousValue) => {
      const toDoSort = [previousValue[index].type, previousValue[index].orderType];

      pageContent.current = 0;
      setContentData([]);
      fetchToDo({
        toDoSort,
      });

      return getNewConditionData(previousValue, index);
    });
  };

  const fetchContent = ({
    contentTitle,
    contentPage,
    contentSize,
    contentSort,
  }: any) => {
    const title = contentTitle ? contentTitle : searchText;
    const page = contentPage ? contentPage : pageContent.current;
    const size = contentSize ? contentSize : 10;
    const sort = contentSort ? contentSort : currentContentSort();

    fetchData('/content/search', { 
      title,
      page,
      size,
      sort,   
    })
      .then((response) => {
        const { data : { data } } = response;

        setContentData((previousValue) => {
          return getNewData(previousValue, data.content);
        });
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {
        isLoading.current === false;
      });
  };

  const fetchToDo = ({
    toDoTitle,
    toDoPage,
    toDoSize,
    toDoSort,
  }: any) => {
    const title = toDoTitle ? toDoTitle : searchText;
    const page = toDoPage ? toDoPage : pageToDo.current;
    const size = toDoSize ? toDoSize : 10;
    const sort = toDoSort ? toDoSort : currentToDoSort();

    fetchData('/todo/search', {
      title,
      page,
      size,
      sort,
    })
      .then((response) => {
        const { data : { data } } = response;

        setToDoData((previousValue) => {
          return getNewData(previousValue, data.todo);
        });
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {
        isLoading.current === false;
      });
  };

  const onContentPageEndReached = () => {
    if ((contentData.length >= 10) && isLoading.current === false) {
      isLoading.current = true;
      pageContent.current += 1;
      fetchContent({});
    }
  };

  const onToDoPageEndReached = () => {
    if ((toDoData.length >= 10 && isLoading.current === false)) {
      isLoading.current = true;
      pageToDo.current += 1;
      fetchToDo({});
    }
  };

  const constants = {
    recentSearchInitialCount: 4,
  };

  const [isSearchResultPage, setIsSearchResultPage] = useState(false);

  // 검색 기능
  const pressSearchButton = () => {
    let currentDataLength = 4;

    if (searchText.length === 0) {
      console.log('입력된 검색어가 없습니다.');
      return;
    }

    setRecentSearchesData((previousValue) => {
      const copiedValue = [...previousValue];
      const duplicatedText = previousValue.find((item) => item.title === searchText);

      if (!duplicatedText && copiedValue.length === 10) {
        copiedValue.pop();
      }

      if (!duplicatedText) {
        copiedValue.unshift({
          id: Math.random(),
          title: searchText,
        });
      }

      currentDataLength = (4 <= copiedValue.length) ? 4 : copiedValue.length;

      return copiedValue;
    });

    // 검색 로그 기록
    createData(
      '/search-logs',
      { userId: 0, searchText } // TODO userId store 에서 가져오기
    )
    .then((response) => {
      // console.log(response);
    });

    if (currentData()?.id === 1) {
      fetchContent({});
    } else {
      fetchToDo({});
    }

    const recentSearchListHeight = recentSearchItemHeight * currentDataLength;

    setRecentSearchListHeight(recentSearchListHeight);
    setIsSearchResultPage(true);
  };

  const pressRemoveSearchTextButton = () => {
    setIsSearchResultPage(false);
    setSearchText('');
  };

  const changeSearchText = (text: string) => {
    // 검색창에 텍스트가 없을시 검색어 화면으로 돌아오기
    if (text.length === 0) {
      setIsSearchResultPage(false);
    }

    setSearchText(text);
  };

  const submitSearchText = ({ nativeEvent }: any) => {

  };

  const currentData = () => {
    const current = tabData.find(item => item.isPressed === true);

    return current;
  };

  // 최근 검색어 아이템 개별 [x] 제거 기능
  const removeRecentSearchItem = (id: number) => {
    /**
     * 열려 있는 경우
     *
     * 배열의 길이가 4보다 큰 경우 → 높이 변화 있음.
     * 배열의 길이가 4보다 적은 경우 → 높이 변화 있음.
     *
     * 닫혀 있는 경우
     *
     * 배열의 길이가 4보다 큰 경우 → 높이 변화 없음.
     * 배열의 길이가 4보다 적은 경우 → 높이 변화 있음.
     *
     */

    setRecentSearchesData((previousData) => {
      const currentData = previousData.filter(item => item.id !== id);
      const currentDataLength = currentData.length;
      const recentSearchListHeight = recentSearchItemHeight * currentDataLength;

      if (
        isRecentSearchListOpen === true ||
        (isRecentSearchListOpen === false &&
          currentDataLength <= constants.recentSearchInitialCount)
      ) {
        setRecentSearchListHeight(recentSearchListHeight);
      }

      return currentData;
    });
  };

  // 최근 검색어 아이템 전체 [모두 지우기] 제거 기능
  const removeAllRecentSearchItems = () => {
    setRecentSearchesData([]);
    setRecentSearchListHeight(recentSearchItemHeight);
  };

  // 최근 검색어 [리스트 더보기] 토글 기능
  const pressMoreListButton = () => {
    if (isRecentSearchListOpen) {
      closeRecentSearchList();
      return;
    }

    openRecentSearchList();
  };

  const closeRecentSearchList = () => {
    const recentSearchListHeight =
      recentSearchItemHeight * constants.recentSearchInitialCount;

    setRecentSearchListHeight(recentSearchListHeight);
    setIsRecentSearchListOpen(false);
  };

  const openRecentSearchList = () => {
    const recentSearchListHeight =
      recentSearchItemHeight * recentSearchData.length;

    setRecentSearchListHeight(recentSearchListHeight);
    setIsRecentSearchListOpen(true);
  };

  // 검색 결과 페이지 진입시 검색 조건 초기화
  useEffect(() => {
    onPressTab(0);
    // content
    setSearchConditionContentData((previousValue) => {
      return getNewConditionData(previousValue, 0);
    });

    // todo
    setSearchConditionToDoData((previousValue) => {
      return getNewConditionData(previousValue, 0);
    });
  }, [isSearchResultPage]);

  useEffect(() => {
    initPopularSearchData();
  }, [isPopularSearchWordListFetched, isPopularSearchWordListRefetching]);

  return (
    <View style={styles.container}>
      <AppHeader style={styles.header}>
        <View style={styles.headerWrapper}>
          {!isSearchResultPage ? (
            <View style={styles.logoContainer}>
              <AppIcon name="logo" width={70} height={20} />
            </View>
          ) : (
            <></>
          )}
          <SearchTextInput
            isSearchResultPage={isSearchResultPage}
            searchText={searchText}
            changeSearchText={changeSearchText}
            submitSearchText={submitSearchText}
            pressRemoveSearchTextButton={pressRemoveSearchTextButton}
            pressSearchButton={pressSearchButton}
          />
          {
            !isSearchResultPage ? 
            <></> 
            : 
            <SearchTab 
              tabData={tabData} 
              onPressTab={onPressTab}
            />
          }
        </View>
      </AppHeader>
      {!isSearchResultPage ? (
        // 검색어
        <SearchWordView
          isRecentSearchListOpen={isRecentSearchListOpen}
          recentSearchData={recentSearchData}
          popularSearchData={popularSearchData}
          pressMoreListButton={pressMoreListButton}
          removeAllRecentSearchItems={removeAllRecentSearchItems}
          removeRecentSearchItem={removeRecentSearchItem}
          height={recentSearchListHeight}
        />
      ) : currentData()?.id === 1 ?
        <SearchContentView
          data={contentData}
          headerComponent={
            <HeaderSearchResult
              data={contentData}
              searchData={searchConditionContentData}
              onPressButton={onPressContentViewConditionButton}
            />
          }
          onEndReached={onContentPageEndReached}
        />
        :
        <SearchToDoView 
          data={toDoData} 
          headerComponent={
            <HeaderSearchResult
              data={toDoData}
              searchData={searchConditionToDoData}
              onPressButton={onPressToDoViewConditionButton}
            />
          } 
          onEndReached={onToDoPageEndReached}
        />
    }
      {/** TODO (일단 검색탭에 컨펌모달 추가) 다른페이지에서 공통으로 사용가능한 방법 모색 */}
      {/* <AppConfirmModal
                isVisible={true}
                title='추가 완료'
                description='할 일 목록에서 확인할 수 있어요'
                button={{
                    first: {
                        text: '목록 바로가기',
                        textStyle: styles.modalTextStyleFirst,
                        buttonStyle: styles.modalButtonStyleFirst,
                        onPressButton: () => {}
                    },
                    second: {
                        text: '계속 둘러보기',
                        textStyle: styles.modalTextStyleSecond,
                        buttonStyle: styles.modalButtonStyleSecond,
                        onPressButton: () => {}
                    }
                }}
            /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    ...Platform.select({
      android: {
        paddingTop: 5,
      },
    }),
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'column',
    paddingHorizontal: 24,
    borderWidth: 0.5,
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#F2F4F7',
    marginVertical: 0,
  },
  headerWrapper: {
    width: '100%',
  },

  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingTop: 22,
  },

  searchResultHeader: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchResultText: {
    fontWeight: '500',
    fontSize: getFontSize(14),
    lineHeight: 17,
    color: '#A1ACB9',
  },

  /** Modal */
  modalTextStyleFirst: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: getFontSize(15),
    lineHeight: 18,
    color: '#FFFFFF',
  },
  modalTextStyleSecond: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: getFontSize(15),
    lineHeight: 18,
    color: '#000E24',
  },

  modalButtonStyleFirst: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#0B2A4F',
  },
  modalButtonStyleSecond: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
});

export default SearchScreen;
