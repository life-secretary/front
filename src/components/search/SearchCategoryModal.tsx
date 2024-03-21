import React, { useState } from 'react';
import { 
    View,
    StyleSheet,
} from 'react-native';

import { AppHeader } from '../common/AppHeader';
import AppButton from '../common/AppButton';
import AppIcon from '../common/AppIcon';
import AppModal from '../common/modal/AppModal';

import SearchCondition from '../../components/search/SearchCondition';
import SearchTab from '../../components/search/SearchTab';
import SearchContentView from '../../components/search/SearchContentView';
import SearchToDoView from '../../components/search/SearchToDoView';

import { getFontSize } from '../../utils/font';

const HeaderCategoryResult = ({ searchData }) => {
    
    return (
        <View style={styles.searchConditionContainer}>
            <SearchCondition data={searchData} /> 
        </View>
    );
};

const SearchCategoryModal = ({
    isVisible
}) => {

    const constants = {
        MODAL_BACKDROP_COLOR: '#FFFFFF',
        MODAL_BACKDROP_OPACITY: 1,
    }; // TODO 상수로 관리

    const contentData = [
        { id: 21, title: '이곳은 콘텐츠의 제목 영역으로 최대 24자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 22, title: '이곳은 콘텐츠의 제목 영역으로 최대 25자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 23, title: '이곳은 콘텐츠의 제목 영역으로 최대 26자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 24, title: '이곳은 콘텐츠의 제목 영역으로 최대 27자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 25, title: '이곳은 콘텐츠의 제목 영역으로 최대 28자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 26, title: '이곳은 콘텐츠의 제목 영역으로 최대 29자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 27, title: '이곳은 콘텐츠의 제목 영역으로 최대 30자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 28, title: '이곳은 콘텐츠의 제목 영역으로 최대 31자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 29, title: '이곳은 콘텐츠의 제목 영역으로 최대 32자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 30, title: '이곳은 콘텐츠의 제목 영역으로 최대 33자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 31, title: '이곳은 콘텐츠의 제목 영역으로 최대 34자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 32, title: '이곳은 콘텐츠의 제목 영역으로 최대 35자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 33, title: '이곳은 콘텐츠의 제목 영역으로 최대 36자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 34, title: '이곳은 콘텐츠의 제목 영역으로 최대 37자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 35, title: '이곳은 콘텐츠의 제목 영역으로 최대 38자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 36, title: '이곳은 콘텐츠의 제목 영역으로 최대 39자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 37, title: '이곳은 콘텐츠의 제목 영역으로 최대 40자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 38, title: '이곳은 콘텐츠의 제목 영역으로 최대 41자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 39, title: '이곳은 콘텐츠의 제목 영역으로 최대 42자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 40, title: '이곳은 콘텐츠의 제목 영역으로 최대 43자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 41, title: '이곳은 콘텐츠의 제목 영역으로 최대 44자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 42, title: '이곳은 콘텐츠의 제목 영역으로 최대 45자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 43, title: '이곳은 콘텐츠의 제목 영역으로 최대 46자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 44, title: '이곳은 콘텐츠의 제목 영역으로 최대 47자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 45, title: '이곳은 콘텐츠의 제목 영역으로 최대 48자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 46, title: '이곳은 콘텐츠의 제목 영역으로 최대 49자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 47, title: '이곳은 콘텐츠의 제목 영역으로 최대 50자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 48, title: '이곳은 콘텐츠의 제목 영역으로 최대 51자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 49, title: '이곳은 콘텐츠의 제목 영역으로 최대 52자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 50, title: '이곳은 콘텐츠의 제목 영역으로 최대 53자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
        { id: 51, title: '이곳은 콘텐츠의 제목 영역으로 최대 54자로', category: '부동산', date: '2024.03.15', thumbnail: require('../../assets/images/thumbnailPlaceholder.jpg') },
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

    // Tab
    const pressTab = (number) => {
        setTabData((previousValue) => {
            return previousValue.map((item, index) => {
                if (index === number) {
                    item.isPressed = true;
                } else {
                    item.isPressed = false;
                }

                return item;
            })
        })
    };

    const onPressContentByViewButton = () => {
        console.log('조회순 버튼 클릭');
        // fetch data code
    };

    const onPressContentBySaveButton = () => {
        console.log('저장순 버튼 클릭');
        // fetch data code
    };

    const onPressContentByRecentButton = () => {
        console.log('최신순 버튼 클릭');
        // fetch data code
    };

    const onPressToDoByViewButton = () => {
        console.log('조회순 버튼 클릭');
        // fetch data code
    };

    const onPressToDoByRecentButton = () => {
        console.log('최신순 버튼 클릭');
        // fetch data code
    };

    const searchConditionContentData = [
        { text: '조회순', handler: onPressContentByViewButton, },
        { text: '저장순', handler: onPressContentBySaveButton, },
        { text: '최신순', handler: onPressContentByRecentButton, },
    ];

    const searchConditionToDoData = [
        { text: '조회순', handler: onPressToDoByViewButton, },
        { text: '최신순', handler: onPressToDoByRecentButton, },
    ];

    const [tabData, setTabData] = useState([
        { 
            id: 1, 
            text: '콘텐츠', 
            isPressed: true, 
            handler: pressTab, 
        }, 
        { 
            id: 2, 
            text: '할 일', 
            isPressed: false, 
            handler: pressTab, 
        },
    ]);

    const currentData = () => {
        const current = tabData.find((item) => item.isPressed === true);

        return current;
    };

    const getSearchHeader = () => {
        const currentTab = currentData()?.id;

        switch(currentTab) {
            case 1:
                return (
                    <HeaderCategoryResult 
                        searchData={searchConditionContentData}
                    />
                );
            case 2:
                return (
                    <HeaderCategoryResult 
                        searchData={searchConditionToDoData}
                    />
                );
            default:
                return (
                    <HeaderCategoryResult 
                        searchData={searchConditionContentData}
                    />
                );
        }
    };

    const getSearchView  = () => {
        const currentTab = currentData()?.id;

        switch(currentTab) {
            case 1:
                return (
                    <SearchContentView 
                        data={contentData} 
                        headerComponent={<></>} 
                    />
                );
            case 2:
                return (
                    <SearchToDoView 
                        data={toDoData} 
                        headerComponent={<></>}
                    />
                );
            default:
                return (
                    <SearchContentView 
                        data={contentData} 
                        headerComponent={<></>} 
                    />
                );
        }
    };

    const [isCategoryDownModalVisible, setIsCategoryDownModalVisible] = useState(false);

    const onPressCategoryButton = () => {
        console.log('press 전체 버튼');
        setIsCategoryDownModalVisible((previousValue) => !previousValue);
    };

    return (
        <AppModal
            isVisible={isVisible}
            backdropColor={constants.MODAL_BACKDROP_COLOR}
            backdropOpacity={constants.MODAL_BACKDROP_OPACITY}
        >
            <View style={styles.container}>
                <AppHeader style={styles.header}>
                    <View style={styles.wrapper}>
                        <View style={styles.backIconWrapper}>
                            <AppIcon 
                                type='stroke'
                                name='back'
                                width={36}
                                height={36}
                                onPress={() => {}}
                            />
                        </View>
                        <View style={styles.selectBoxWrapper}>
                            <View style={styles.selectBoxButtonContainer}>
                                <AppButton 
                                    text={'전체'} // variable 처리
                                    textStyle={styles.categoryText}
                                    onPressButton={onPressCategoryButton}
                                />
                                <AppIcon 
                                    type='fill'
                                    name='angleDown'
                                    width={42}
                                    height={42}
                                    onPress={onPressCategoryButton}
                                />
                            </View>
                        </View>
                    </View>
                    <SearchTab tabData={tabData} />
                </AppHeader>
                {getSearchHeader()}
                {getSearchView()}
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
        paddingHorizontal: 24,
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
    },

    backIconWrapper: {
        flex: 1,
    },
    selectBoxWrapper: {
        flex: 8,
        alignItems: 'center',
    },
    selectBoxButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
});

export default SearchCategoryModal;