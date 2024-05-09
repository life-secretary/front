import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import type {CategoryObject} from '../../models/common';

import color from '../../styles/color';
import {AppHeader} from '../common/AppHeader';
import AppButton from '../common/AppButton';
import AppIcon from '../common/AppIcon';
import AppModal from '../common/modal/AppModal';

import SearchCondition from '../../components/search/SearchCondition';
import SearchTab from '../../components/search/SearchTab';
import SearchContentView from '../../components/search/SearchContentView';
import SearchToDoView from '../../components/search/SearchToDoView';

import {getFontSize} from '../../utils/font';
import {getSort, getNewData, getNewConditionData} from '@/utils/search';

import {fetchData} from '@/api/api';
import {useRecoilValue} from 'recoil';
import {homeCategoryListState} from '@/store/categoryState';

export type ConditionData = {
  text: string;
  type: 'viewCount' | 'scrapCount' | 'createdAt';
  orderType: 'desc' | 'asc';
  isSelected: boolean;
};

type DropDownCategoryProps = {
  // NOTE: Function 과 () => {} 차이 ?
  categories: CategoryObject[];
  onPressListItemButton: Function;
  onPressDimmedSpace: () => void;
};

type SearchCategoryModal = {
  isVisible: boolean;
  closeCategoryModal: () => void;
  selectedCategory: CategoryObject;
};

const DropDownCategory = ({
  categories,
  onPressListItemButton,
  onPressDimmedSpace,
}: DropDownCategoryProps): React.JSX.Element => {
  return (
    <>
      <View style={styles.dropDownDivider} />
      <View style={styles.dropDownContainer}>
        {categories.map(item => {
          return (
            <AppButton
              key={item.id}
              text={item.title}
              textStyle={styles.categoryListText}
              onPressButton={() => onPressListItemButton(item)}
            />
          );
        })}
        <TouchableOpacity onPress={onPressDimmedSpace}>
          <View style={styles.dropDownRestDimmed} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const SearchCategoryModal = ({
  isVisible,
  closeCategoryModal,
  selectedCategory,
}: SearchCategoryModal): React.JSX.Element => {
  const categories = useRecoilValue(homeCategoryListState);
  const [category, setCategory] = useState(selectedCategory);
  const isLoading = useRef<boolean>(false);

  const [isCategoryDownModalVisible, setIsCategoryDownModalVisible] =
    useState(false);

  const [tabData, setTabData] = useState([
    {id: 1, text: '콘텐츠', isPressed: true},
    {id: 2, text: '할 일', isPressed: false},
  ]);

  // content
  const pageContent = useRef<number>(0);
  const [searchConditionContentData, setSearchConditionContentData] = useState<
    Array<ConditionData>
  >([
    {text: '조회순', type: 'viewCount', orderType: 'desc', isSelected: true},
    {text: '저장순', type: 'scrapCount', orderType: 'desc', isSelected: false},
    {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
  ]);
  const [contentData, setContentData] = useState([]);

  // todo
  const pageToDo = useRef<number>(0);
  const [searchConditionToDoData, setSearchConditionToDoData] = useState<
    Array<ConditionData>
  >([
    {text: '조회순', type: 'viewCount', orderType: 'desc', isSelected: true},
    {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
  ]);
  const [toDoData, setToDoData] = useState([]);

  // NOTICE: date format을 YYYY-MM-DD로 수정

  const onPressTab = (number: number) => {
    setTabData(previousValue => {
      return previousValue.map((item, index) => {
        if (number === index) {
          item.isPressed = true;
        } else {
          item.isPressed = false;
        }

        if (index === 0) {
          resetContentCondition();
        } else {
          resetToDoCondition();
        }

        return item;
      });
    });
  };

  const resetContentCondition = () => {
    setSearchConditionContentData(previousValue => {
      return getNewConditionData(previousValue, 0);
    });
  };

  const resetToDoCondition = () => {
    setSearchConditionToDoData(previousValue => {
      return getNewConditionData(previousValue, 0);
    });
  };

  // content condition
  const onPressContentViewConditionButton = (
    data: ConditionData,
    index: number,
  ): void => {
    setSearchConditionContentData(previousValue => {
      return getNewConditionData(previousValue, index);
    });
    setContentData([]);
    pageContent.current = 0;
  };

  // todo condition
  const onPressToDoViewConditionButton = (
    data: ConditionData,
    index: number,
  ): void => {
    setSearchConditionToDoData(previousValue => {
      return getNewConditionData(previousValue, index);
    });
    setContentData([]);
    pageContent.current = 0;
  };

  const currentContentSort = () => {
    return getSort(searchConditionContentData);
  };

  const currentToDoSort = () => {
    return getSort(searchConditionToDoData);
  };

  const fetchContent = ({
    contentCategoryId,
    contentPage,
    contentSize,
    contentSort,
  }: any) => {
    const categoryId = contentCategoryId ? contentCategoryId : category.id;
    const page = contentPage ? contentPage : pageContent.current;
    const size = contentSize ? contentSize : 10;
    const sort = contentSort ? contentSort : currentContentSort();

    fetchData('/content', {
      categoryId, //NOTE 4 로 테스트
      page,
      size,
      sort,
    })
      .then(response => {
        const {
          data: {data},
        } = response;

        setContentData(previousValue => {
          return getNewData(previousValue, data.content);
        });
      })
      .catch(error => {
        console.log('error', error);
      })
      .finally(() => {
        isLoading.current === false;
      });
  };

  const fetchToDo = ({todoCategoryId, todoPage, todoSize, todoSort}: any) => {
    const categoryId = todoCategoryId ? todoCategoryId : category.id;
    const page = todoPage ? todoPage : pageToDo.current;
    const size = todoSize ? todoSize : 10;
    const sort = todoSort ? todoSort : currentToDoSort();

    // api 개발되면 주석 제거
    // fetchData('/todo', {
    //   categoryId,
    //   page,
    //   size,
    //   sort,
    // })
    //   .then((response) => {
    //     const { data : { data } } = response;

    //     setToDoData((previousValue) => {
    //       return getNewData(previousValue, data.todo);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   })
    //   .finally(() => {
    //     isLoading.current === false;
    //   });
  };

  const onContentPageEndReached = () => {
    if (contentData.length >= 10 && isLoading.current === false) {
      isLoading.current = true;
      pageContent.current += 1;
      fetchContent({});
    }
  };

  const onToDoPageEndReached = () => {
    if (toDoData.length >= 10 && isLoading.current === false) {
      isLoading.current = true;
      pageToDo.current += 1;
      fetchToDo({});
    }
  };

  const currentData = () => {
    const current = tabData.find(item => item.isPressed === true);

    return current;
  };

  const onToggleCategoryButton = () => {
    setIsCategoryDownModalVisible(previousValue => !previousValue);
  };

  const onPressCategoryNameButton = (category: CategoryObject) => {
    setCategory(category);
    setIsCategoryDownModalVisible(false);
  };

  useEffect(() => {
    fetchToDo({});
  }, [category, searchConditionToDoData]);

  useEffect(() => {
    fetchContent({});
  }, [category, searchConditionContentData]);

  // 카테고리 변경시 적용
  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  // 모달 열렸을 때 검색 조건 초기화
  useEffect(() => {
    onPressTab(0);
    resetContentCondition(); // content
    resetToDoCondition(); // todo
  }, [isVisible]);

  return (
    <AppModal
      isVisible={isVisible}
      backdropColor={color.main.white}
      backdropOpacity={1}>
      <View style={styles.container}>
        <AppHeader style={styles.header}>
          <View style={styles.wrapper}>
            {!isCategoryDownModalVisible && (
              <View style={styles.backIconWrapper}>
                <AppIcon
                  name="back"
                  width={36}
                  height={36}
                  onPress={closeCategoryModal}
                />
              </View>
            )}
            <View style={styles.selectBoxWrapper}>
              <AppButton
                text={category.title}
                textStyle={styles.categoryText}
                onPressButton={onToggleCategoryButton}
              />
              <View style={styles.selectBoxButtonContainer}>
                <View style={styles.selectBoxButtonWrapper}>
                  <AppIcon
                    name="angleDown"
                    width={42}
                    height={42}
                    onPress={onToggleCategoryButton}
                    styles={{color: '#000000'}}
                  />
                </View>
              </View>
            </View>
          </View>
          <SearchTab tabData={tabData} onPressTab={onPressTab} />
        </AppHeader>
        {/** TODO fix 야매 DropDown */}
        {isCategoryDownModalVisible && (
          <DropDownCategory
            categories={categories}
            onPressListItemButton={onPressCategoryNameButton}
            onPressDimmedSpace={onToggleCategoryButton}
          />
        )}
        {/** sort conditions */}
        <View style={styles.searchConditionContainer}>
          <SearchCondition
            data={
              currentData()?.id === 1
                ? searchConditionContentData
                : searchConditionToDoData
            }
            onPressButton={
              currentData()?.id === 1
                ? onPressContentViewConditionButton
                : onPressToDoViewConditionButton
            }
          />
        </View>
        {/** list */}
        {currentData()?.id === 1 ? (
          <SearchContentView
            data={contentData}
            headerComponent={<></>}
            onEndReached={onContentPageEndReached}
          />
        ) : (
          <SearchToDoView
            data={toDoData}
            headerComponent={<></>}
            onEndReached={onToDoPageEndReached}
          />
        )}
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
  wrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  backIconWrapper: {
    position: 'absolute',
    zIndex: 5,
  },
  selectBoxWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 42,
  },
  selectBoxButtonContainer: {
    position: 'relative',
    height: 42,
  },
  selectBoxButtonWrapper: {
    position: 'absolute',
  },

  searchConditionContainer: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  categoryText: {
    fontWeight: '600',
    fontSize: getFontSize(20),
    lineHeight: 24,
    alignSelf: 'center',
  },
  categoryListText: {
    fontWeight: '600',
    fontSize: getFontSize(18),
    lineHeight: 22,
    color: '#526070',
    paddingVertical: 8,
    alignSelf: 'center',
  },

  dropDownDivider: {
    position: 'absolute',
    top: 51,
    width: '100%',
    zIndex: 2,
    borderColor: '#F2F4F7',
    borderWidth: 0.5,
  },
  dropDownContainer: {
    position: 'absolute',
    top: 42,
    width: '100%',
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    gap: 10,
    paddingTop: 25,
  },
  dropDownRestDimmed: {
    height: '100%',
    backgroundColor: '#111111',
    opacity: 0.4,
  },
});

export default SearchCategoryModal;
