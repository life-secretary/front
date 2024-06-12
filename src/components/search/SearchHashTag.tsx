import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppText } from '../common/AppText';
import { AppHeader } from '../common/AppHeader';
import AppIcon from '../common/AppIcon';

import SearchTextInput from '../../components/search/SearchTextInput';
import SearchTab from '../../components/search/SearchTab';
import SearchContentView from '../../components/search/SearchContentView';
import SearchToDoView from '../../components/search/SearchToDoView';
import { fetchData } from '@/api/api';
import { getNewData } from '@/utils/search';

import { getFontSize } from '../../utils/font';

const HashTagResultHeader = ({ data, hashTag }: any) => {

    return (
        <View style={styles.searchResultHeader}>
            <AppText style={styles.searchText}>'{hashTag}'</AppText>
            <AppText style={styles.searchResultText}>검색 결과 {data.length}건</AppText>
        </View>
    );
};

const SearchHashTag = ({
    route,
    navigation
}: any) => {
    const { pressedHashtag } = route.params;
    const pageHashTagContent = useRef<number>(0);
    const isHashTagLoading = useRef<boolean>(false);
    const [hashTagContent, setHashTagContent] = useState([]);

    // const [tabData, setTabData] = useState([
    //     { id: 1, text: '콘텐츠', isPressed: true }, 
    //     { id: 2, text: '할 일', isPressed: false },
    // ]);

    // const onPressTab = (number: number) => {
    //     setTabData((previousValue) => {
    //       return previousValue.map((item, index) => {
    //         if (number === index) {
    //           item.isPressed = true;
    //         } else {
    //           item.isPressed = false;
    //         }
    
    //         return item;
    //       });
    //     });
    // };

    // const toDoData = [
    //     { id: 1, title: '할 일의 제목 입력은 22자 제한으로 둠', category: '부동산', },
    //     { id: 2, title: '할 일의 제목 입력은 23자 제한으로 둠', category: '부동산', },
    //     { id: 3, title: '할 일의 제목 입력은 24자 제한으로 둠', category: '부동산', },
    //     { id: 4, title: '할 일의 제목 입력은 25자 제한으로 둠', category: '부동산', },
    //     { id: 1, title: '할 일의 제목 입력은 26자 제한으로 둠', category: '부동산', },
    //     { id: 2, title: '할 일의 제목 입력은 27자 제한으로 둠', category: '부동산', },
    //     { id: 3, title: '할 일의 제목 입력은 28자 제한으로 둠', category: '부동산', },
    //     { id: 4, title: '할 일의 제목 입력은 29자 제한으로 둠', category: '부동산', },
    //     { id: 1, title: '할 일의 제목 입력은 30자 제한으로 둠', category: '부동산', },
    //     { id: 2, title: '할 일의 제목 입력은 31자 제한으로 둠', category: '부동산', },
    //     { id: 3, title: '할 일의 제목 입력은 32자 제한으로 둠', category: '부동산', },
    //     { id: 4, title: '할 일의 제목 입력은 33자 제한으로 둠', category: '부동산', },
    //     { id: 1, title: '할 일의 제목 입력은 34자 제한으로 둠', category: '부동산', },
    //     { id: 2, title: '할 일의 제목 입력은 35자 제한으로 둠', category: '부동산', },
    //     { id: 3, title: '할 일의 제목 입력은 36자 제한으로 둠', category: '부동산', },
    //     { id: 4, title: '할 일의 제목 입력은 37자 제한으로 둠', category: '부동산', },
    //     { id: 1, title: '할 일의 제목 입력은 38자 제한으로 둠', category: '부동산', },
    //     { id: 2, title: '할 일의 제목 입력은 39자 제한으로 둠', category: '부동산', },
    //     { id: 3, title: '할 일의 제목 입력은 40자 제한으로 둠', category: '부동산', },
    //     { id: 4, title: '할 일의 제목 입력은 41자 제한으로 둠', category: '부동산', },
    // ];

    const changeSearchText = () => {};
    const submitSearchText = () => {};
    const pressRemoveSearchTextButton = () => {};
    const pressSearchButton = () => {};

    // const currentData = () => {
    //     const current = tabData.find((item) => item.isPressed === true);

    //     return current;
    // };

    const fetchHashTagContent = ({
        hashTagContentText,
        hashTagContentPage,
        hashTagContentSize,
        hashTagContentSort,
      }: any) => {
        const hashtag = hashTagContentText ? hashTagContentText : pressedHashtag;
        const page = hashTagContentPage ? hashTagContentPage : pageHashTagContent.current;
        const size = hashTagContentSize ? hashTagContentSize : 10;
        const sort = hashTagContentSort ? hashTagContentSort : 'viewCount,desc';
    
        fetchData(`/content/search`, {
          hashtag,
          page,
          size,
          sort,
        })
        .then((response) => {
          const { data : { data } } = response;
    
          setHashTagContent((prev) => {
            if (page === 0) {
                return getNewData(prev, data.content);
            }

            // TODO 무한 스크롤링 잘 되는지 테스트 필요
            return [...prev, ...getNewData(prev, data.content)];
          })
        })
        .catch((error) => {
          console.log('콘텐츠 해시태그 검색 에러', error);
        })
        .finally(() => {
          isHashTagLoading.current = false;
        });
    };

    const onHashTagContentPageEndReached = () => {
        if ((hashTagContent.length >= 10) && isHashTagLoading.current === false) {
          isHashTagLoading.current = true;
          pageHashTagContent.current += 1;
          fetchHashTagContent({});
        }
    };

    const openContentModal = (id: any) => {
        // 렌더링 사이클 이슈로 동작 막기
        // navigation.navigate('ContentModal', { id });
    };

    useEffect(() => {
        if (!pressedHashtag) {
            return;
        }

        fetchHashTagContent({ hashTagContentText: pressedHashtag });
    }, [pressedHashtag]);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.header}>
                <View style={styles.wrapper}>
                    <View style={styles.backIconWrapper}>
                        <AppIcon 
                            name='back'
                            width={36}
                            height={36}
                            onPress={() => navigation.goBack()}
                        />
                    </View>
                    <View style={styles.textInputWrapper}>
                        <SearchTextInput 
                            disabled={true}
                            isSearchResultPage={true}
                            searchText={pressedHashtag}
                            changeSearchText={changeSearchText}
                            submitSearchText={submitSearchText}
                            pressRemoveSearchTextButton={pressRemoveSearchTextButton}
                            pressSearchButton={pressSearchButton}
                        />
                    </View>
                </View>
                {/* <SearchTab 
                    tabData={tabData} 
                    onPressTab={onPressTab}
                /> */}
            </AppHeader>
            {/* {
                currentData()?.id === 1 ?
                <SearchContentView 
                    type='hashtag'
                    data={content} 
                    headerComponent={
                        <HashTagResultHeader 
                            data={content} 
                            hashTag={hashTag} 
                        />
                    } 
                    onEndReached={() => {}} // 검색 페이지 참고
                />
                :
                <SearchToDoView 
                    type='hashtag'
                    data={toDoData} 
                    headerComponent={
                        <HashTagResultHeader 
                            data={toDoData} 
                            hashTag={hashTag} 
                        />
                    }
                    onEndReached={() => {}} // 검색 페이지 참고
                />
            } */}
            <SearchContentView 
                type='hashtag'
                data={hashTagContent} 
                headerComponent={
                    hashTagContent.length ?
                    <HashTagResultHeader 
                        data={hashTagContent} 
                        hashTag={pressedHashtag} 
                    />
                    :
                    <></>
                } 
                onEndReached={onHashTagContentPageEndReached}  
                onPressContent={openContentModal}
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
        paddingTop: 50,
        paddingHorizontal: 24,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#F2F4F7',
        marginVertical: 0,
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    backIconWrapper: {
        flex: 2,
    },
    textInputWrapper: {
        flex: 15,
    },

    searchResultHeader: {
        height: 52, 
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 10,
        gap: 8,
    },
    searchText: {
        fontWeight: '700',
        fontSize: getFontSize(13),
        lineHeight: 16,
        color: '#40474F',
    },
    searchResultText: {
        fontWeight: '500',
        fontSize: getFontSize(14),
        lineHeight: 17,
        color: '#A1ACB9',
    },
});

export default SearchHashTag;