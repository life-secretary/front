import React, { useState, useEffect, useRef } from 'react';
import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput,
    StyleSheet, 
    View, 
    Keyboard,
    Platform,
    Pressable,
} from 'react-native';

import { AppHeader } from '../components/common/AppHeader';
import { AppText } from '../components/common/AppText';
import AppIcon from '../components/common/AppIcon';
import AppConfirmModal from '../components/common/modal/AppConfirmModal';

import SearchWordView from '../components/search/SearchWordView';
import SearchContentView from '../components/search/SearchContentView';
import SearchToDoView from '../components/search/SearchToDoView';

import { getFontSize } from '../utils/font';

const SearchScreen = () => {

    const recentSearchItemRef = useRef(null);
    const [recentSearchItemHeight, setRecentSearchItemHeight] = useState(0);
    const [recentSearchListHeight, setRecentSearchListHeight] = useState(0);
    const [isRecentSearchListOpen, setIsRecentSearchListOpen] = useState(false);

    const [recentSearchData, setRecentSearchesData] = useState([
        { id: 1, title: '최근 검색어가 이곳에 표시' },
        { id: 2, title: '바로 지울 수 있어요' },
        { id: 3, title: '뭘 검색할까요' },
        { id: 4, title: '금리' },
        { id: 5, title: '4대보험' },
        { id: 6, title: '전세 자금 대출' },
        { id: 7, title: '연말정산' },
    ]);

    const [searchText, setSearchText] = useState('');

    const [popularSearchData, setPopularSearchData] = useState([
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
    ]);

    const contentData = [
        { id: 21, title: '이곳은 콘텐츠의 제목 영역으로 최대 24자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 22, title: '이곳은 콘텐츠의 제목 영역으로 최대 25자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 23, title: '이곳은 콘텐츠의 제목 영역으로 최대 26자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 24, title: '이곳은 콘텐츠의 제목 영역으로 최대 27자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 25, title: '이곳은 콘텐츠의 제목 영역으로 최대 28자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 26, title: '이곳은 콘텐츠의 제목 영역으로 최대 29자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 27, title: '이곳은 콘텐츠의 제목 영역으로 최대 30자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 28, title: '이곳은 콘텐츠의 제목 영역으로 최대 31자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 29, title: '이곳은 콘텐츠의 제목 영역으로 최대 32자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 30, title: '이곳은 콘텐츠의 제목 영역으로 최대 33자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 31, title: '이곳은 콘텐츠의 제목 영역으로 최대 34자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 32, title: '이곳은 콘텐츠의 제목 영역으로 최대 35자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 33, title: '이곳은 콘텐츠의 제목 영역으로 최대 36자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 34, title: '이곳은 콘텐츠의 제목 영역으로 최대 37자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 35, title: '이곳은 콘텐츠의 제목 영역으로 최대 38자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 36, title: '이곳은 콘텐츠의 제목 영역으로 최대 39자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 37, title: '이곳은 콘텐츠의 제목 영역으로 최대 40자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 38, title: '이곳은 콘텐츠의 제목 영역으로 최대 41자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 39, title: '이곳은 콘텐츠의 제목 영역으로 최대 42자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 40, title: '이곳은 콘텐츠의 제목 영역으로 최대 43자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 41, title: '이곳은 콘텐츠의 제목 영역으로 최대 44자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 42, title: '이곳은 콘텐츠의 제목 영역으로 최대 45자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 43, title: '이곳은 콘텐츠의 제목 영역으로 최대 46자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 44, title: '이곳은 콘텐츠의 제목 영역으로 최대 47자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 45, title: '이곳은 콘텐츠의 제목 영역으로 최대 48자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 46, title: '이곳은 콘텐츠의 제목 영역으로 최대 49자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 47, title: '이곳은 콘텐츠의 제목 영역으로 최대 50자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 48, title: '이곳은 콘텐츠의 제목 영역으로 최대 51자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 49, title: '이곳은 콘텐츠의 제목 영역으로 최대 52자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 50, title: '이곳은 콘텐츠의 제목 영역으로 최대 53자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
        { id: 51, title: '이곳은 콘텐츠의 제목 영역으로 최대 54자로', category: '부동산', date: '2024.03.15', thumbnail: require('../assets/images/thumbnailPlaceholder.jpg') },
    ];

    const toDoData = [
        { id: 1, title: '할 일의 제목 입력은 22자 제한으로 둠', category: '부동산', },
        { id: 2, title: '할 일의 제목 입력은 23자 제한으로 둠', category: '부동산', },
        { id: 3, title: '할 일의 제목 입력은 24자 제한으로 둠', category: '부동산', },
        { id: 4, title: '할 일의 제목 입력은 25자 제한으로 둠', category: '부동산', },
        { id: 1, title: '할 일의 제목 입력은 26자 제한으로 둠', category: '부동산', },
        { id: 2, title: '할 일의 제목 입력은 27자 제한으로 둠', category: '부동산', },
        { id: 3, title: '할 일의 제목 입력은 28자 제한으로 둠', category: '부동산', },
        { id: 4, title: '할 일의 제목 입력은 29자 제한으로 둠', category: '부동산', },
        { id: 1, title: '할 일의 제목 입력은 30자 제한으로 둠', category: '부동산', },
        { id: 2, title: '할 일의 제목 입력은 31자 제한으로 둠', category: '부동산', },
        { id: 3, title: '할 일의 제목 입력은 32자 제한으로 둠', category: '부동산', },
        { id: 4, title: '할 일의 제목 입력은 33자 제한으로 둠', category: '부동산', },
        { id: 1, title: '할 일의 제목 입력은 34자 제한으로 둠', category: '부동산', },
        { id: 2, title: '할 일의 제목 입력은 35자 제한으로 둠', category: '부동산', },
        { id: 3, title: '할 일의 제목 입력은 36자 제한으로 둠', category: '부동산', },
        { id: 4, title: '할 일의 제목 입력은 37자 제한으로 둠', category: '부동산', },
        { id: 1, title: '할 일의 제목 입력은 38자 제한으로 둠', category: '부동산', },
        { id: 2, title: '할 일의 제목 입력은 39자 제한으로 둠', category: '부동산', },
        { id: 3, title: '할 일의 제목 입력은 40자 제한으로 둠', category: '부동산', },
        { id: 4, title: '할 일의 제목 입력은 41자 제한으로 둠', category: '부동산', },
    ];

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
        setSearchText('');
        setIsSearchResultPage(false);
    };

    const changeSearchText = (text) => {
        setSearchText(text);
    };

    const submitSearchText = ({ nativeEvent: {text, eventCount, target} }) => {
        console.log('text', text);
        console.log('eventCount', eventCount);
        console.log('target', target);
    };

    // Tab
    const tabs = [{ name: '콘텐츠' }, { name: '할 일' }];
    const [isFirstTab, setIsFirstTab] = useState(true);

    const pressContentTab = () => {
        setIsFirstTab(true);
    };

    const pressToDoTab = () => {
        setIsFirstTab(false);
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

        setRecentSearchesData((previousData) => {
            const currentData = previousData.filter((item) => item.id !== id);
            const currentDataLength = currentData.length;
            const recentSearchListHeight = recentSearchItemHeight * currentDataLength; 

            if (isRecentSearchListOpen === true || ((isRecentSearchListOpen === false) && 
            (currentDataLength <= constants.recentSearchInitialCount))) {
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
            const recentSearchListHeight = height * constants.recentSearchInitialCount;

            setRecentSearchItemHeight(height);
            setRecentSearchListHeight(recentSearchListHeight);
        })

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
        const recentSearchListHeight = recentSearchItemHeight * constants.recentSearchInitialCount;

        setRecentSearchListHeight(recentSearchListHeight);
        setIsRecentSearchListOpen(false);
    };

    const openRecentSearchList = () => {
        const recentSearchListHeight = recentSearchItemHeight * recentSearchData.length;

        setRecentSearchListHeight(recentSearchListHeight);
        setIsRecentSearchListOpen(true);
    };

    useEffect(() => {
        getRecentSearchItemHeight();
    }, []);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.header}>
                {
                    !isSearchResultPage ? 
                    <View style={styles.logoContainer}>
                        <AppIcon 
                            type='stroke'
                            name='logo'
                            width={70}
                            height={20}
                        />
                    </View>
                    :
                    null
                }       
                <KeyboardAvoidingView behavior={'padding'}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.searchTextInputContainer}>
                            <View style={styles.searchTextInputWrapper}>
                                <TextInput
                                    editable
                                    placeholder='키워드를 입력해보세요' 
                                    style={[styles.searchTextInput, isSearchResultPage ? styles.searchTextResultInput : {}]} 
                                    placeholderTextColor={'#CBD3DC'}
                                    value={searchText}
                                    onChangeText={changeSearchText}
                                    onSubmitEditing={submitSearchText}
                                    returnKeyType='search'
                                    underlineColorAndroid='transparent'
                                />
                            </View>
                            <View style={styles.searchIconWrapper}>
                                {
                                    isSearchResultPage ? 
                                    <AppIcon 
                                        type='fill'
                                        name='closeFillLight'
                                        width={36}
                                        height={36}
                                        onPress={pressRemoveSearchTextButton}
                                    />
                                    :
                                    null
                                }
                                <AppIcon 
                                    type='stroke'
                                    name='search'
                                    width={36}
                                    height={36}
                                    onPress={pressSearchButton}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
                {
                    isSearchResultPage ? 
                    <View style={styles.tabContainer}>
                        <Pressable style={styles.tabButtonContainer} onPress={pressContentTab}>
                            <View style={[styles.tabButtonTextContainer, isFirstTab ? {} : styles.tabButtonTextContainerDisplay]}>
                                <AppText style={styles.tabButtonText}>콘텐츠</AppText>
                            </View>
                        </Pressable>
                        <Pressable style={styles.tabButtonContainer} onPress={pressToDoTab}>
                            <View style={[styles.tabButtonTextContainer, isFirstTab ? styles.tabButtonTextContainerDisplay : {}]}>
                                <AppText style={styles.tabButtonText}>할 일</AppText>
                            </View>
                        </Pressable>
                    </View>
                    :
                    null
                }
            </AppHeader>
            {
                !isSearchResultPage ? 
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
                :
                isFirstTab ? 
                // 컨텐츠 
                <SearchContentView data={contentData} />
                :
                // 할 일
                <SearchToDoView data={toDoData} />
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
            }
        }),
        paddingBottom: 100, // TODO 해결 필요
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 24,
        borderTopColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#F2F4F7',
        marginVertical: 0,
    },

    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingTop: 22,
    },

    keyBoardView: {
        flex: 1,
        marginTop: 25,
        marginBottom: 22,
    },

    searchTextInputContainer: {
        justifyContent: 'center',
    },
    searchTextInputWrapper: {
        paddingVertical: 22,
    },
    searchTextInput: {
        height: 48,
        paddingLeft: 18,
        paddingRight: 48,
        borderRadius: 10,
        backgroundColor: '#F2F4F7',
    },
    searchTextResultInput: {
        height: 36,
    },
    searchIconWrapper: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        gap: 4,
        paddingRight: 4,
    },

    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchMainTitle: {
        fontWeight: '700',
        fontSize: getFontSize(15),
        lineHeight: 18,
        color: '#000E24'
    },
    searchSubTitle: {
        fontWeight: '500',
        fontSize: getFontSize(13),
        lineHeight: 16,
        color: '#A1ACB9'
    },

    // 최근 검색어
    recentSearchContainer: {
        paddingTop: 22,
        paddingHorizontal: 24,
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
        fontSize: getFontSize(15),
        lineHeight: 18,
        color: '#526070',
    },

    // 리스트 더보기 버튼
    moreRecentSearchListButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    moreRecentSearchListButtonText: {
        fontWeight: '500',
        fontSize: getFontSize(15),
        lineHeight: 18,
        color: '#40474F'
    },

    // 인기 검색어
    popularSearchContainer: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    popularSearchTextContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
    },
    popularSearchIndexText: {
        flex: 1,
        fontWeight: '600',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: '#000E24',
    },  
    popularSearchTitleText: {
        flex: 10,
        fontWeight: '500',
        fontSize: getFontSize(15),
        lineHeight: 18,
        color: '#526070'
    },

    // 구분선
    separator: {
        marginVertical: 22, // 이렇게 관리하는 게 맞나!
        borderWidth: 0.5,
        borderColor: '#F2F4F7',
    },
    separatorToDo: {
        marginVertical: 10,
    },

    // 할 일
    toDoContainer: {
        paddingHorizontal: 24,
    },
    toDoFooter: {
        height: 60,
    },

    // 검색 조건
    searchConditionContainer: {
        height: 52, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 10,
    },
    searchConditionButtonContainer: {
        flexDirection: 'row', 
        justifyContent: 'flex-end',
        gap: 14,
    },
    searchConditionText: {
        fontWeight: '500',
        fontSize: getFontSize(14),
        lineHeight: 17,
        color: '#A1ACB9',
    },

    // 탭
    tabContainer : {
        height: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonTextContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: 'black'
    },
    tabButtonTextContainerDisplay: {
        borderBottomColor: 'transparent'
    },
    tabButtonText: {
        fontWeight: '600',
        fontSize: getFontSize(15),
        lineHeight: 18,
    },

    /** Modal */
    modalTextStyleFirst: {
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: getFontSize(15),
        lineHeight: 18,
        color: '#FFFFFF'
    },
    modalTextStyleSecond: {
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: getFontSize(15),
        lineHeight: 18,
        color: '#000E24'
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
    }
});

export default SearchScreen;