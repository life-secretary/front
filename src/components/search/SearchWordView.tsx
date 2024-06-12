import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';

import { AppText } from '../../components/common/AppText';
import AppIcon from '../../components/common/AppIcon';
import AppButton from '../../components/common/AppButton';

import { getFontSize } from '../../utils/font';

import type { RecentSearchWord, PopularSearchWord } from '@/store/search';

type SearchWordViewProps = {
    isRecentSearchListOpen: boolean;
    recentSearchData: Array<RecentSearchWord>;
    popularSearchData: Array<PopularSearchWord>;
    pressMoreListButton: () => void;
    removeAllRecentSearchItems: () => void;
    removeRecentSearchItem: (id: number) => void;
    onPressPopularSearchWord: (text: string) => void;
    height: number;
};

const SearchWordView = ({ 
    isRecentSearchListOpen = false,
    recentSearchData,
    popularSearchData,
    pressMoreListButton,
    removeAllRecentSearchItems,
    removeRecentSearchItem,
    onPressPopularSearchWord,
    height,
}: SearchWordViewProps) => {
    const getDate = () => {
        const date = new Date();
        const month = String(date.getMonth() + 1);
        const day = String(date.getDate());
        const hours = String(date.getHours());
        const minutes = String(date.getMinutes());

        const viewMonth = month.length === 1 ? '0' + month : month;
        const viewDay = day.length === 1 ? '0' + day : day;
        const viewHours = hours.length === 1 ? '0' + hours : hours;
        const viewMinutes = minutes.length === 1 ? '0' + minutes : minutes;

        return `${viewMonth}월 ${viewDay}일 ${viewHours}:${viewMinutes} 기준`;
    };

    const constants = {
        recentSearchInitialCount: 4,
    };

    return (
        <ScrollView>
            <View style={styles.recentSearchContainer}>
                <View style={styles.searchContainer}>
                    <AppText style={styles.searchMainTitle}>최근 검색어</AppText>
                    {
                        recentSearchData.length ? 
                        <AppButton 
                            text='모두 지우기'
                            textStyle={styles.searchSubTitle}
                            onPressButton={removeAllRecentSearchItems}
                        /> 
                        : 
                        null
                    }
                </View>
                <View>
                    <View style={[
                            styles.recentSearchItemList, 
                            { height: height <= 0 ? 35 : height }, // 임시 코드
                        ]}>
                        {
                            // 최근 검색어 있는 화면
                            recentSearchData && (recentSearchData.length > 0) ? 
                            recentSearchData.map((item, index) => {
                                return (
                                    <View 
                                        key={`recentSearch${index}`} 
                                        collapsable={false} 
                                        style={styles.recentSearchItemContainer}
                                    >
                                        <AppText style={styles.recentSearchText}>{item.title}</AppText>
                                        <AppIcon 
                                            name='closeLight'
                                            width={36}
                                            height={36}
                                            onPress={() => removeRecentSearchItem(item.id)}
                                        />
                                    </View>
                                );
                            })
                            :
                            // 최근 검색어 없는 화면
                            <View style={styles.recentSearchItemContainer}>
                                <AppText style={styles.recentSearchText}>최근 검색어가 없습니다</AppText>
                            </View>
                        }
                    </View>
                    {
                        recentSearchData.length > constants.recentSearchInitialCount ? 
                        <View style={styles.moreRecentSearchListButtonContainer}>
                            <AppButton 
                                text={`리스트 ${isRecentSearchListOpen ? '접기' : '더보기'}`}
                                textStyle={styles.moreRecentSearchListButtonText}
                                onPressButton={pressMoreListButton}
                            />
                            <AppIcon 
                                name={isRecentSearchListOpen ? 'arrowUp' : 'arrowDown'}
                                width={36}
                                height={36}
                                onPress={pressMoreListButton}
                            />
                        </View>
                        : null
                    }
                </View>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.popularSearchContainer}>
                <View style={styles.searchContainer}>
                    <AppText style={styles.searchMainTitle}>인기 검색어</AppText>
                    <AppText style={styles.searchSubTitle}>{getDate()}</AppText>
                </View>
                {popularSearchData.map((item, index) => {
                    return (
                        <Pressable 
                            key={`popularSearch${index}`} 
                            onPress={() => onPressPopularSearchWord(item.searchText)}
                        >
                            <View style={styles.popularSearchTextContainer}>
                                <AppText style={styles.popularSearchIndexText}>{index + 1}</AppText>
                                <AppText style={styles.popularSearchTitleText}>{item.searchText}</AppText>
                            </View>
                        </Pressable>
                    );
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    // 공통 소제목
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
        paddingBottom: 44,
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
});

export default SearchWordView;