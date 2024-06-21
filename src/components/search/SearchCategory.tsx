import React, { useState, useEffect, useRef } from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import type {CategoryObject} from '../../models/common';
import { useRecoilValue } from 'recoil';
import { homeCategoryListState } from '@/store/categoryState';

import {AppHeader} from '../common/AppHeader';
import AppButton from '../common/AppButton';
import AppIcon from '../common/AppIcon';

import SearchCondition from '../../components/search/SearchCondition';
import SearchTab from '../../components/search/SearchTab';
import SearchContentView from '../../components/search/SearchContentView';
import SearchToDoView from '../../components/search/SearchToDoView';

import { getFontSize } from '../../utils/font';
import { getSort, getNewData, getNewConditionData } from '@/utils/search';

import { fetchData } from '@/api/api';
import { getCategoryContentListQuery, getCategoryToDoListQuery } from '@/api/search';

export type ConditionData = {
    text: string;
    type: 'viewCount' | 'saveCount' | 'scrapCount' | 'createdAt'; 
    orderType: 'desc' | 'asc';
    isSelected: boolean;
  };

type DropDownCategoryProps = {
    // NOTE: Function 과 () => {} 차이 ?
    onPressListItemButton: Function;
    onPressDimmedSpace: () => void;
  };

const DropDownCategory = ({
    onPressListItemButton,
    onPressDimmedSpace,
  }: DropDownCategoryProps): React.JSX.Element => {
    const homeCategories = useRecoilValue(homeCategoryListState);

    return (
      <>
        <View style={styles.dropDownDivider} />
        <View style={styles.dropDownContainer}>
          {homeCategories.map(item => {
            return (
              <AppButton
                key={item.id}
                text={item.title}
                textStyle={styles.categoryListText}
                onPressButton={() =>
                  onPressListItemButton(item)
                }
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

const SearchCategory = ({
    route,
    navigation
}: any) => {
    const { selectedCategory, selectedSort } = route.params;
    // 메인 컨텐츠 정렬 초기값 설정을 위한 selectedSort

    const [category, setCategory] = useState<any>({});
    const isLoading = useRef<boolean>(false);

    // content
    const pageContent = useRef<number>(0);
    const [searchConditionContentData, setSearchConditionContentData] = useState<Array<ConditionData>>([
        {text: '조회순', type: 'viewCount', orderType: 'desc', isSelected: true},
        {text: '저장순', type: 'scrapCount', orderType: 'desc', isSelected: false},
        {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
    ]);
    const [categoryConditionContent, setCategoryConditionContent] = useState({
      /** 전체 조회시 카테고리 id 넘기지 않기 */
      categoryId: selectedCategory.id === 0 ? '' : selectedCategory.id,
      page: 0,
      size: 10,
      sort: selectedSort ? selectedSort : 'viewCount,desc',
    });
    const { data:content, isFetching:ContentIsFetching, isRefetching:ContentIsRefetching } = getCategoryContentListQuery(categoryConditionContent);
    const [contentData, setContentData] = useState<any>([]);

    // todo
    const pageToDo = useRef<number>(0);
    const [searchConditionToDoData, setSearchConditionToDoData] = useState<Array<ConditionData>>([
        {text: '저장순', type: 'saveCount', orderType: 'desc', isSelected: true},
        {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
    ]);
    const [categoryConditionToDo, setCategoryConditionToDo] = useState({
      categoryId: selectedCategory.id === 0 ? '' : selectedCategory.id,
      page: 0,
      size: 10,
      sort: 'saveCount,desc'
    })
    const { data:toDo, isFetching:TodoIsFetching, isRefetching:toDoIsRefetching } = getCategoryToDoListQuery(categoryConditionToDo);
    const [toDoData, setToDoData] = useState<any>([]);

    // 야매 드롭다운 리스트
    const [isCategoryDownModalVisible, setIsCategoryDownModalVisible] = useState(false);

    const [tabData, setTabData] = useState([
        {id: 1, text: '콘텐츠', isPressed: true},
        {id: 2, text: '할 일', isPressed: false},
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

      if (number === 0) {
        pageContent.current = 0;
        resetContentCondition();
        setCategoryConditionContent((prev) => ({
          ...prev,
          page: 0,
          sort: 'viewCount,desc',
        }));
      } else {
        pageToDo.current = 0;
        resetToDoCondition();
        setCategoryConditionToDo((prev) => ({
          ...prev,
          page: 0,
          sort: 'saveCount,desc',
        }))
      }
    };

  const resetContentCondition = () => {
    setSearchConditionContentData((prev) => getNewConditionData(prev, 0));
  };

  const resetToDoCondition = () => {
    setSearchConditionToDoData((prev) => getNewConditionData(prev, 0));
  };

  // content condition
  const onPressContentViewConditionButton = (data: ConditionData, index: number): void => {
    pageContent.current = 0;
    setSearchConditionContentData((prev) => getNewConditionData(prev, index));
    setCategoryConditionContent((prev) => ({
      ...prev,
      page: 0,
      sort: `${data.type},${data.orderType}`,
    }));
  };

  // todo condition
  const onPressToDoViewConditionButton = (data: ConditionData, index: number): void => {
    pageToDo.current = 0;
    setSearchConditionToDoData((prev) => getNewConditionData(prev, index));
    setCategoryConditionToDo((prev) => ({
      ...prev,
      page: 0,
      sort: `${data.type},${data.orderType}`,
    }));
  };

  const onContentPageEndReached = () => {
    if ((contentData.length >= 10) && isLoading.current === false) {
      pageContent.current += 1;
      setCategoryConditionContent((prev) => ({
        ...prev,
        page: pageContent.current,
      }))
    }
  };

  const onToDoPageEndReached = () => {
    if ((toDoData.length >= 10 && isLoading.current === false)) {
      pageToDo.current += 1;
      setCategoryConditionToDo((prev) => ({
        ...prev,
        page: pageToDo.current,
      }))
    }
  };

  const currentData = () => {
    const current = tabData.find(item => item.isPressed === true);

    return current;
  };

  const onToggleCategoryButton = () => {
    setIsCategoryDownModalVisible(previousValue => !previousValue);
  };

  const onPressCategoryNameButton = (
    category: CategoryObject
  ) => {
    setCategory(category);

    // content 재검색
    resetContentCondition();
    pageContent.current = 0;
    setCategoryConditionContent((prev) => ({
      ...prev,
      categoryId: category.id === 0 ? '' : category.id,
      page: 0,
      sort: 'viewCount,desc'
    }));

    // todo 재검색
    resetToDoCondition();
    pageToDo.current = 0;
    setCategoryConditionToDo((prev) => ({
      ...prev,
      categoryId: category.id === 0 ? '' : category.id,
      page: 0,
      sort: 'saveCount,desc'
    }));

    setIsCategoryDownModalVisible(false);
  };

  const onPressContent = (id: number) => {
    navigation.navigate('ContentModal', { id });
  };

  const onPressToDo = (id: number) => {
    navigation.navigate('ToDoDetail', { id });
  };

  useEffect(() => {
    isLoading.current = true;
    if (!content) {
      return;
    }

    if (pageContent.current === 0) {
      setContentData(content);  
    } else {
      setContentData((prev: any) => [...prev, ...content]);
    }

    isLoading.current = false;
  }, [ContentIsFetching, ContentIsRefetching, content]);

  useEffect(() => {
    isLoading.current = true;
    if (!toDo) {
      return;
    }

    if (pageToDo.current === 0) {
      setToDoData(toDo);
    } else {
      setToDoData((prev: any) => [...prev, ...toDo]);
    }

    isLoading.current = false;
  }, [TodoIsFetching, toDoIsRefetching, toDo]);

  useEffect(() => {
    if ((!selectedCategory.id && selectedCategory.id !== 0)) {
        return;
    }

    setCategory(selectedCategory);
  }, [selectedCategory]);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.header}>
                <View style={styles.wrapper}>
                    {!isCategoryDownModalVisible && (
                    <View style={styles.backIconWrapper}>
                        <AppIcon
                        name="back"
                        width={36}
                        height={36}
                        onPress={() => navigation.goBack()}
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
            <SearchTab 
                tabData={tabData} 
                onPressTab={onPressTab}
            />
            </AppHeader>
            {/** TODO fix 야매 DropDown */}
            {isCategoryDownModalVisible && (
            <DropDownCategory
                onPressListItemButton={onPressCategoryNameButton}
                onPressDimmedSpace={onToggleCategoryButton}
            />
            )}
            {/** sort conditions */}
            <View style={styles.searchConditionContainer}>
              {
                (currentData()?.id === 1 && !!contentData.length) &&
                <SearchCondition 
                    data={searchConditionContentData} 
                    onPressButton={onPressContentViewConditionButton}
                />
              }
              {
                (currentData()?.id === 2 && !!toDoData.length) &&
                <SearchCondition 
                    data={searchConditionToDoData} 
                    onPressButton={onPressToDoViewConditionButton}
                />
              }
            </View>
            {/** list */}
            {
            currentData()?.id === 1 ?
                <SearchContentView 
                    type='category'
                    data={contentData} 
                    headerComponent={<></>} 
                    onEndReached={onContentPageEndReached}
                    onPressContent={onPressContent}
                />
            :
                <SearchToDoView 
                    type='category'
                    data={toDoData} 
                    headerComponent={<></>} 
                    onEndReached={onToDoPageEndReached}
                    onPressToDo={onPressToDo}
                />
            }
      </View>
    )
};

const styles = StyleSheet.create({
    container: {
      width: '100%',
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
      marginTop: 60,
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
      top: 110,
      width: '100%',
      zIndex: 2,
      borderColor: '#F2F4F7',
      borderWidth: 0.5,
    },
    dropDownContainer: {
      position: 'absolute',
      top: 120,
      width: '100%',
      zIndex: 1,
      backgroundColor: '#FFFFFF',
      gap: 10,
    },
    dropDownRestDimmed: {
      height: '100%',
      backgroundColor: '#111111',
      opacity: 0.4,
    },
  });

export default SearchCategory;