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

import {getFontSize} from '../utils/font';

import {fetchData} from '@/api/api';

import type { ConditionData } from '../components/search/SearchCategoryModal';

const HeaderSearchResult = ({
  data, 
  searchData,
  onPressButton,
}) => {
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
  const recentSearchItemRef = useRef(null);
  const [recentSearchItemHeight, setRecentSearchItemHeight] = useState(0);
  const [recentSearchListHeight, setRecentSearchListHeight] = useState(0);
  const [isRecentSearchListOpen, setIsRecentSearchListOpen] = useState(false);

  const isLoading = useRef<boolean>(false);
  const pageContent = useRef<number>(0);
  const pageToDo = useRef<number>(0);

  const [contentData, setContentData] = useState([]);
  const [toDoData, setToDoData] = useState([]);

  // 일단 분리
  const [sortConditionContent, setSortConditionContent] = useState<Array<string>>(['viewCount', 'desc']);
  const [sortConditionToDo, setSortConditionTodo] = useState<Array<string>>(['viewCount', 'desc']); // TODO api 완성되면 붙이기

  const [recentSearchData, setRecentSearchesData] = useState([
    {id: 1, title: '최근 검색어가 이곳에 표시'},
    {id: 2, title: '바로 지울 수 있어요'},
    {id: 3, title: '뭘 검색할까요'},
    {id: 4, title: '금리'},
    {id: 5, title: '4대보험'},
    {id: 6, title: '전세 자금 대출'},
    {id: 7, title: '연말정산'},
  ]);

  const [popularSearchData, setPopularSearchData] = useState([
    {id: 11, title: '4대보험'},
    {id: 12, title: '전세 자금 대출'},
    {id: 13, title: '연말정산'},
    {id: 14, title: '분리수거 방법'},
    {id: 15, title: '자취'},
    {id: 16, title: '신용카드'},
    {id: 17, title: '신용점수 관리'},
    {id: 18, title: '건강검진'},
    {id: 19, title: '사회초년생'},
    {id: 20, title: '퇴사'},
  ]);

  const [tabData, setTabData] = useState([
    {id: 1, text: '콘텐츠', isPressed: true},
    {id: 2, text: '할 일', isPressed: false},
  ]);

  const [searchConditionContentData, setSearchConditionContentData] = useState<Array<ConditionData>>([
    {text: '조회순', type: 'viewCount', orderType: 'desc', isSelected: true},
    {text: '저장순', type: 'scrapCount', orderType: 'desc', isSelected: false},
    {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
  ]);

  const [searchConditionToDoData, setSearchConditionToDoData] = useState<Array<ConditionData>>([
    {text: '조회순', type: 'viewCount', orderType: 'desc', isSelected: true},
    {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
  ]);

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

  const getNewSelectedConditionData = (data: Array<ConditionData>, index: number): Array<ConditionData> => {
    return data.map((item, idx) => {
      if (index === idx) {
        item.isSelected = true;
      } else {
        item.isSelected = false;
      }

      return item;
    });
  };

  const getNewSortCondition = (previousData: Array<string>, data: ConditionData) => {
    if ((previousData[0] === data.type) && (previousData[1] === data.orderType)) {
      return previousData;
    }

    return [data.type, data.orderType];
  };

  // content condition
  const onPressContentViewConditionButton = (data: ConditionData, index: number): void => {
    setSearchConditionContentData((previousValue) => {
      return getNewSelectedConditionData(previousValue, index);
    });

    setSortConditionContent((previousValue) => {
      return getNewSortCondition(previousValue, data);
    });
  };

  // todo condition
  const onPressToDoViewConditionButton = (data: ConditionData, index: number): void => {
    setSearchConditionToDoData((previousValue) => {
      return getNewSelectedConditionData(previousValue, index);
    });

    setSortConditionTodo((previousValue) => {
      return getNewSortCondition(previousValue, data);
    });
  };

  const fetchContent = () => {
    fetchData('/content', { 
      // TODO 검색 조건 붙이기 (컨텐츠 검색 api 아직)
    })
      .then((response) => {
        const { data : { data } } = response;
        setContentData(data.content);
      })
      .catch((error) => {
        console.log('error', error);
      })
      .finally(() => {
        isLoading.current === false;
      });
  };

  const fetchToDo = () => {
    fetchData('/todo', {
      // TODO 검색 조건 붙이기 (투두 검색 api 아직)
    })
      .then((response) => {
        const { data : { data } } = response;
        setToDoData(data.todo); // TODO key 확인 필요
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
      fetchContent();
    }
  };

  const onToDoPageEndReached = () => {
    if ((toDoData.length >= 10 && isLoading.current === false)) {
      isLoading.current = true;
      pageToDo.current += 1;
      fetchToDo();
    }
  };

  const constants = {
    recentSearchInitialCount: 4,
  };

  const [isSearchResultPage, setIsSearchResultPage] = useState(false);

  // 검색 기능
  // TODO 검색과 동시에 UI 변경
  const pressSearchButton = () => {
    setIsSearchResultPage(true);

    // useState test
    // console.log('search 버튼 클릭');
    // setRecentSearchesData((previousValue) => {
    //     return previousValue.concat({ id: previousValue.length + 1, title: '안녕하세요' });
    // });
  };

  const pressRemoveSearchTextButton = () => {
    setIsSearchResultPage(false);
  };

  const changeSearchText = (text) => {
    // 검색창에 텍스트가 없을시 검색어 화면으로 돌아오기
    if (text.length === 0) {
      setIsSearchResultPage(false);
    }
  };

  const submitSearchText = ({nativeEvent: {text, eventCount, target}}) => {
    console.log('text', text);
    console.log('eventCount', eventCount);
    console.log('target', target);
  };

  const currentData = () => {
    const current = tabData.find(item => item.isPressed === true);

    return current;
  };

  // 최근 검색어 아이템 개별 [x] 제거 기능
  const removeRecentSearchItem = (id) => {
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

    setRecentSearchesData(previousData => {
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

  const getRecentSearchItemHeight = () => {
    // ERROR
    // recentSearchItemRef.current 가 null 인 경우 있음.
    // height 값이 일정하지 않은 이유 모르겠음.
    recentSearchItemRef.current.measureInWindow((x, y, width, height) => {
      const recentSearchListHeight =
        height * constants.recentSearchInitialCount;

      setRecentSearchItemHeight(height);
      setRecentSearchListHeight(recentSearchListHeight);
    });
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

  useEffect(() => {
    getRecentSearchItemHeight();
  }, []);

  useEffect(() => {
    onPressTab(0);
    // content
    setSearchConditionContentData((previousValue) => {
      return getNewSelectedConditionData(previousValue, 0);
    });
    setSortConditionContent((previousValue) => {
      return getNewSortCondition(previousValue, searchConditionContentData[0]);
    });

    // todo
    setSearchConditionToDoData((previousValue) => {
      return getNewSelectedConditionData(previousValue, 0);
    });
    setSortConditionTodo((previousValue) => {
      return getNewSortCondition(previousValue, searchConditionToDoData[0]);
    });
  }, [isSearchResultPage])

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
          recentSearchItemRef={recentSearchItemRef}
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
    paddingBottom: 100, // TODO 해결 필요
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
