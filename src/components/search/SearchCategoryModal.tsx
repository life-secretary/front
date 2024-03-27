import React, { useState } from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
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

import { DUMMY_CATEGORY } from '../../components/home/HomeCategoryList'; // 임시 참고

const HeaderCategoryResult = ({ searchData }) => {
    
    return (
        <View style={styles.searchConditionContainer}>
            <SearchCondition data={searchData} /> 
        </View>
    );
};

const DropDownCategory = ({
    onPressListItemButton,
    onPressDimmedSpace,
}) => {
    return (
        <>
            <View style={styles.dropDownDivider} />
            <View style={styles.dropDownContainer}>
                    {
                        DUMMY_CATEGORY.map((item) => {
                            return (
                                <AppButton 
                                    text={item.title}
                                    textStyle={styles.categoryListText}
                                    onPressButton={() => onPressListItemButton({ id: item.id, title: item.title })}
                                />
                            )
                        })
                    }
                <TouchableOpacity onPress={onPressDimmedSpace}>
                    <View style={styles.dropDownRestDimmed} />
                </TouchableOpacity>
            </View>
        </>
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
    // 카테고리의 이름과 아이디 모두 필요할 듯하여.
    const [currentCategory, setCurrentCategory] = useState({ id: '1', title: '전체' });

    const onToggleCategoryButton = () => {
        setIsCategoryDownModalVisible((previousValue) => !previousValue);
    };

    const onPressCategoryNameButton = (currentCategory) => {
        /**
         * 카테고리 이름을 표기할 때 api 조회 파라미터에 있는 id값을 참조해서 표기하면 되는건가..?
         * 부모 컴포넌트가 모든 카테고리에 대한 데이터를 가지고 있지 않아도 되는가 ?
         */
        console.log(currentCategory);
        setCurrentCategory(currentCategory);
        // todo code: api get request
        setIsCategoryDownModalVisible(false);
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
                        {/** isCategoryDownModalVisible 뒤로가기 버튼 숨기기 */}
                        {
                            !isCategoryDownModalVisible &&
                                <View style={styles.backIconWrapper}>
                                    <AppIcon 
                                        type='stroke'
                                        name='back'
                                        width={36}
                                        height={36}
                                        onPress={() => {}}
                                    />
                                </View>
                        }
                        <View style={styles.selectBoxWrapper}>
                            <AppButton 
                                text={currentCategory.title} // variable 처리
                                textStyle={styles.categoryText}
                                onPressButton={onToggleCategoryButton}
                            />
                            <View style={styles.selectBoxButtonContainer}>
                                <View style={styles.selectBoxButtonWrapper}>
                                    <AppIcon 
                                        type='fill'
                                        name='angleDown'
                                        width={42}
                                        height={42}
                                        onPress={onToggleCategoryButton}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <SearchTab tabData={tabData} />
                </AppHeader>
                {/** 야매 DropDown */}
                {
                    isCategoryDownModalVisible && 
                    <DropDownCategory 
                        onPressListItemButton={onPressCategoryNameButton} 
                        onPressDimmedSpace={onToggleCategoryButton}
                    />
                }
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
        flexDirection: 'column',
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
        marginBottom: 10,
    },

    backIconWrapper: {
        position: 'absolute',
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