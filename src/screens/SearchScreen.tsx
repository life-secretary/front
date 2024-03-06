import React, { useState, useEffect, useRef } from 'react';
import { 
    ScrollView, 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet, 
    View, 
    Button,
    Keyboard 
} from 'react-native';

import { AppLayout } from '../components/common/AppLayout';
import { AppHeader } from '../components/common/AppHeader';
import { AppText } from '../components/common/AppText';
import AppIcon from '../components/common/AppIcon';

const SearchScreen = () => {

    const recentSearchItem = useRef(null);
    const [recentSearchItemHeight, setRecentSearchItemHeight] = useState(0);
    const [recentSearchListHeight, setRecentSearchListHeight] = useState(0);
    const [isRecentSearchListOpen, setIsRecentSearchListOpen] = useState(false);

    const [recentSearchesData, setRecentSearchesData] = useState([
        { id: 1, title: '최근 검색어가 이곳에 표시' },
        { id: 2, title: '바로 지울 수 있어요' },
        { id: 3, title: '뭘 검색할까요' },
        { id: 4, title: '금리' },
        { id: 5, title: '4대보험' },
        { id: 6, title: '전세 자금 대출' },
        { id: 7, title: '연말정산' },
    ]);

    const popularSearchData = [
        { id: 11, title: '4대보험' },
        { id: 12, title: '전세 자금 대출' },
        { id: 13, title: '연말정산' },
        { id: 14, title: '분리수거 방법' },
        { id: 15, title: '자취' },
        { id: 16, title: '신용카드' },
        { id: 17, title: '신용점수 관리' },
        { id: 18, title: '건강검진' },
        { id: 19, title: '사회초년생' },
        { id: 20, title: '퇴사' },
    ];

    const constants = {
        recentSearchInitialCount: 4,
    };

    // 최근 검색어 아이템 개별 [x] 제거 기능
    const removeRecentSearchItem = (id) => {

        /**
         * 열려 있는 경우
         * 
         * 배열의 길이가 4보다 큰 경우 → 높이 변화 있음.
         * 배열의 길이가 4보다 적은 경우 → 높이 변화 없음.
         * 
         * 닫혀 있는 경우
         * 
         * 배열의 길이가 4보다 큰 경우 → 높이 변화 없음.
         * 배열의 길이가 4보다 적은 경우 → 높이 변화 없음.
         * 
         */

        setRecentSearchesData((previousData) => {
            const currentData = previousData.filter((item) => item.id !== id);
            const currentDataLength = currentData.length;
            const recentSearchListHeight = recentSearchItemHeight * currentDataLength; 

            // 최근 검색어 높이 고정 x
            // if (isRecentSearchListOpen === true || ((isRecentSearchListOpen === false) && (currentDataLength <= constants.recentSearchInitialCount))) {
            //     setRecentSearchListHeight(recentSearchListHeight);
            // }

            // 최근 검색어 높이 고정 o
            if ((isRecentSearchListOpen === true) && (currentDataLength >= constants.recentSearchInitialCount)) {
                setRecentSearchListHeight(recentSearchListHeight);
            }

            return currentData;
        });

    };

    // 최근 검색어 아이템 전체 [모두 지우기] 제거 기능
    const removeAllRecentSearchItems = () => {
        setRecentSearchesData([]);

        // NOTE
        // 모든 데이터 제거시 '최근 검색어가 없습니다' 문구 띄울지 말지 논의
    };

    const getRecentSearchItemHeight = () => {

        // ERROR
        // recentSearchItem.current 가 null 인 경우 있음.
        // height 값이 일정하지 않은 이유 모르겠음.
        recentSearchItem.current.measureInWindow((x, y, width, height) => {
            const recentSearchListHeight = height * constants.recentSearchInitialCount;

            setRecentSearchItemHeight(height);
            setRecentSearchListHeight(recentSearchListHeight);
        })

    };

    // 최근 검색어 [리스트 더보기] 토글 기능
    const handleRecentSearchList = () => {
        
        if (isRecentSearchListOpen) {
            closeRecentSearchList();
            return;  
        }

        openRecentSearchList();
    
    };

    const closeRecentSearchList = () => {
        const recentSearchListHeight = recentSearchItemHeight * constants.recentSearchInitialCount;

        setRecentSearchListHeight(recentSearchListHeight);
        setIsRecentSearchListOpen(false);
    };

    const openRecentSearchList = () => {
        const recentSearchListHeight = recentSearchItemHeight * recentSearchesData.length;

        setRecentSearchListHeight(recentSearchListHeight);
        setIsRecentSearchListOpen(true);
    };

    useEffect(() => {
        getRecentSearchItemHeight();
    }, []);

    return (
        <AppLayout>
            <AppHeader>
                <View style={styles.basicContainer}>
                    <AppText style={styles.searchTitle}>인생 비서</AppText>
                </View>
            </AppHeader>
            <KeyboardAvoidingView
                behavior={'padding'}
                style={styles.keyBoardView}
            >
                <TouchableWithoutFeedback
                    onPress={Keyboard.dismiss}
                >
                    <View style={styles.searchTextInputContainer}>
                        <TextInput 
                            placeholder='키워드를 입력해보세요' 
                            style={styles.searchTextInput} 
                            placeholderTextColor={'#CBD3DC'}
                        />
                        <View style={styles.searchIconWrapper}>
                            <AppIcon 
                                type='stroke'
                                name='search'
                                width={36}
                                height={36}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            <View style={styles.separator}></View>
            <ScrollView>
                <View>
                    <View style={styles.searchContainer}>
                        <AppText style={styles.searchMainTitle}>최근 검색어</AppText>
                        {/** TODO AppPressableText 로 변경 */}
                        {
                            recentSearchesData.length ? <Button title='모두 지우기' onPress={removeAllRecentSearchItems}></Button> : null
                        }
                    </View>
                    <View>
                        <View style={[
                                styles.recentSearchItemList, 
                                { height: recentSearchListHeight }
                            ]}>
                            {recentSearchesData.map((item, index) => {
                                return (
                                    <View 
                                        key={`recentSearch${index}`} 
                                        collapsable={false} 
                                        ref={recentSearchItem} 
                                        style={styles.recentSearchItemContainer}
                                    >
                                        <AppText style={styles.recentSearchText}>{item.title}</AppText>
                                        <AppIcon 
                                            type='stroke'
                                            name='closeLight'
                                            width={36}
                                            height={36}
                                            onPress={() => removeRecentSearchItem(item.id)}
                                        />
                                    </View>
                                );
                            })}
                        </View>
                        {
                            recentSearchesData.length > constants.recentSearchInitialCount ? 
                            <View style={styles.moreRecentSearchListButtonContainer}>
                                {/** TODO AppPressableText 로 변경 */}
                                <Button title={`리스트 ${isRecentSearchListOpen ? '접기' : '더보기'}`} onPress={handleRecentSearchList} />
                               <AppIcon 
                                    type='stroke'
                                    name={isRecentSearchListOpen ? 'arrowUpDark' : 'arrowDownDark'}
                                    width={36}
                                    height={36}
                                    onPress={handleRecentSearchList}
                               />
                            </View>
                            : null
                        }
                    </View>
                </View>
                <View style={styles.separator}></View>
                <View>
                    <View style={styles.searchContainer}>
                        <AppText style={styles.searchMainTitle}>{'인기 검색어'}</AppText>
                        <AppText style={styles.searchSubTitle}>{'01월 14일 02:00 기준'}</AppText>
                    </View>
                    {popularSearchData.map((item, index) => {
                        return (
                            <View key={`popularSearch${index}`} style={styles.popularSearchContainer}>
                                <AppText style={styles.popularSearchIndexText}>{index + 1}</AppText>
                                <AppText style={styles.popularSearchTitleText}>{item.title}</AppText>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </AppLayout>
    );
};

const styles = StyleSheet.create({
    basicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    searchTitle: {
        // TODO logo title
    },

    keyBoardView: {
        flex: 1,
        marginTop: 25,
        marginBottom: 15,
    },

    searchTextInputContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    searchTextInput: {
        borderRadius: 10,
        paddingVertical: 20,
        paddingLeft: 8,
        paddingRight: 18,
        backgroundColor: '#F2F4F7',
    },
    searchIconWrapper: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingRight: 8,
    },

    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchMainTitle: {
        fontWeight: '700',
        fontSize: 15, // TODO getFontSize() 함수 적용하기
        lineHeight: 18,
        color: '#000E24'
    },
    // 추후 적용
    searchSubTitle: {
        fontWeight: '500',
        fontSize: 13, // TODO getFontSize() 함수 적용하기
        lineHeight: 16,
        color: '#A1ACB9'
    },


    recentSearchItemList: {
        overflow: 'hidden',
    },
    recentSearchItemContainer: {
        height: 38, // 방어 코드

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    recentSearchText: {
        fontWeight: '500',
        fontSize: 15, // TODO getFontSize() 함수 적용하기
        lineHeight: 18,
        color: '#526070',
    },

    moreRecentSearchListButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    popularSearchContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    popularSearchIndexText: {
        flex: 1,
        fontWeight: '600',
        fontSize: 16, // TODO getFontSize() 함수 적용하기
        lineHeight: 20,
        color: '#000E24',
    },  
    popularSearchTitleText: {
        flex: 10,
        fontWeight: '500',
        fontSize: 15, // TODO getFontSize() 함수 적용하기
        lineHeight: 18,
        color: '#526070'
    },

    separator: {
        marginVertical: 17,
        borderWidth: 1,
        borderColor: '#F2F4F7'
    }
});

export default SearchScreen;