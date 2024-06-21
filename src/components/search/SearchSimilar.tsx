import React, { useState, useEffect, useRef } from 'react';
import {View, StyleSheet, TouchableOpacity } from 'react-native';
import type {CategoryObject} from '../../models/common';
import { useRecoilValue } from 'recoil';
import { homeCategoryListState } from '@/store/categoryState';
import type { ConditionData } from './SearchCategory';

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
import { getSimilarContentListQuery } from '@/api/search';

const SearchSimilar = ({
    route,
    navigation,
}: any) => {

    const isLoading = useRef<boolean>(false);

    // content
    const pageContent = useRef<number>(0);
    const [searchConditionContentData, setSearchConditionContentData] = useState<Array<ConditionData>>([
        {text: '조회순', type: 'viewCount', orderType: 'desc', isSelected: true},
        {text: '저장순', type: 'scrapCount', orderType: 'desc', isSelected: false},
        {text: '최신순', type: 'createdAt', orderType: 'desc', isSelected: false},
    ]);
    const [categoryConditionContent, setCategoryConditionContent] = useState({
        page: 0,
        size: 10,
        sort: 'viewCount,desc',
      });

    const { data:content, isFetching:ContentIsFetching, isRefetching:ContentIsRefetching } = getSimilarContentListQuery(categoryConditionContent);
    const [contentData, setContentData] = useState<any>([]);

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

    const onContentPageEndReached = () => {
        if ((contentData.length >= 10) && isLoading.current === false) {
          pageContent.current += 1;
          setCategoryConditionContent((prev) => ({
            ...prev,
            page: pageContent.current,
          }))
        }
    };

    const onPressContent = (id: number) => {
        navigation.navigate('ContentModal', { id });
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

    return (
        <View style={styles.container}>
            <AppHeader style={styles.header}>
                <View style={styles.wrapper}>
                    <View style={styles.backIconWrapper}>
                        <AppIcon
                        name="back"
                        width={36}
                        height={36}
                        onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={styles.selectBoxWrapper}>
                        <AppButton
                            text={'추천'}
                            textStyle={styles.categoryText}
                            onPressButton={() => {}}
                        />
                    </View>
                </View>
            </AppHeader>
            {/** sort conditions */}
            <View style={styles.searchConditionContainer}>
              {
                !!contentData.length &&
                <SearchCondition 
                    data={searchConditionContentData} 
                    onPressButton={onPressContentViewConditionButton}
                />
              }
            </View>
            {/** list */}
            <SearchContentView 
                type='category'
                data={contentData} 
                headerComponent={<></>} 
                onEndReached={onContentPageEndReached}
                onPressContent={onPressContent}
            />
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
  });

export default SearchSimilar;