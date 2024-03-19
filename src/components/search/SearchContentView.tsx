import React from 'react';
import { VirtualizedList, View, StyleSheet } from 'react-native';

import { AppText } from '../../components/common/AppText';

import { HomeContentsItem } from '../../components/home/homeContents/HomeContentsItem';
import SearchCondition from '../../components/search/SearchCondition';

import { getFontSize } from '../../utils/font';

const SearchContentView = ({ data }) => {

    const getContentTabItem = (_data, index) => {
        console.log(data[index]);
        return data[index];
    };

    const getContentTabItemCount = () => {
        return data.length;
    };

    const getContentTabKeyExtractor = (item, index) => {
        const keyName = 'content' + item.id;
        
        return keyName;
    };

    const onPressByViewButton = () => {
        console.log('조회순 버튼 클릭');
        // fetch data code
    };

    const onPressBySaveButton = () => {
        console.log('저장순 버튼 클릭');
        // fetch data code
    };

    const onPressByRecentButton = () => {
        console.log('최신순 버튼 클릭');
        // fetch data code
    };

    const searchConditionData = [
        { text: '조회순', handler: onPressByViewButton, },
        { text: '저장순', handler: onPressBySaveButton, },
        { text: '최신순', handler: onPressByRecentButton, },
    ];

    return (
        <VirtualizedList
            initialNumToRender={8}
            renderItem={({ item }) => {
                return (
                    <HomeContentsItem 
                        title={item.title}
                        thumbnail={item.thumbnail}
                        category={item.category}
                        date={item.date}
                    />
                );
            }}
            keyExtractor={getContentTabKeyExtractor}
            getItemCount={getContentTabItemCount}
            getItem={getContentTabItem}
            ItemSeparatorComponent={() => <View style={styles.separatorContent} />}
            ListHeaderComponent={() => {
                return (
                    <View style={styles.searchConditionContainer}>
                        <AppText style={styles.searchConditionText}>검색 결과 {data.length}건</AppText>
                        <SearchCondition data={searchConditionData} />
                    </View>
                );
            }}
            ListFooterComponent={() => <View style={styles.contentFooter} />}
            style={styles.contentContainer}
            />
    );
};

const styles = StyleSheet.create({
    searchConditionContainer: {
        height: 52, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 10,
    },
    searchConditionText: {
        fontWeight: '500',
        fontSize: getFontSize(14),
        lineHeight: 17,
        color: '#A1ACB9',
    },

    contentContainer: {
        paddingHorizontal: 24,
    },
    contentFooter: {
        height: 60,
    },

    separatorContent: {
        marginVertical: 16,
        borderWidth: 0.5,
        borderColor: '#F2F4F7',
    },
});

export default SearchContentView;