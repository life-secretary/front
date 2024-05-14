import React, { useState } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import { AppText } from '../common/AppText';
import { AppHeader } from '../common/AppHeader';
import AppIcon from '../common/AppIcon';
import AppModal from '../common/modal/AppModal';

import SearchTextInput from '../../components/search/SearchTextInput';
import SearchTab from '../../components/search/SearchTab';
import SearchContentView from '../../components/search/SearchContentView';
import SearchToDoView from '../../components/search/SearchToDoView';

import { getFontSize } from '../../utils/font';

const HashTagResultHeader = ({ data, hashTag }: any) => {

    return (
        <View style={styles.searchResultHeader}>
            <AppText style={styles.searchText}>'{hashTag}'</AppText>
            <AppText style={styles.searchResultText}>검색 결과 {data.length}건</AppText>
        </View>
    );
};

const SearchHashTagModal = ({
    isVisible,
    hashTag,
    content,
    pressBackButton,
}: any) => {

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

    const constants = {
        MODAL_BACKDROP_COLOR: '#FFFFFF',
        MODAL_BACKDROP_OPACITY: 1,
    }; // TODO 상수로 관리

    const changeSearchText = () => {};
    const submitSearchText = () => {};
    const pressRemoveSearchTextButton = () => {};
    const pressSearchButton = () => {};

    // const currentData = () => {
    //     const current = tabData.find((item) => item.isPressed === true);

    //     return current;
    // };

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
                                name='back'
                                width={36}
                                height={36}
                                onPress={pressBackButton}
                            />
                        </View>
                        <View style={styles.textInputWrapper}>
                            <SearchTextInput 
                                disabled={true}
                                isSearchResultPage={true}
                                searchText={hashTag}
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
                    data={content} 
                    headerComponent={
                        <HashTagResultHeader 
                            data={content} 
                            hashTag={hashTag} 
                        />
                    } 
                    onEndReached={() => {}} // 검색 페이지 참고
                />
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
})

export default SearchHashTagModal;