import React from 'react';
import { VirtualizedList, View, StyleSheet } from 'react-native';

import { AppText } from '../../components/common/AppText';

import ToDoListItem from './ToDoListItem';
import SearchCondition from '../../components/search/SearchCondition';

import { getFontSize } from '../../utils/font';

const SearchToDoView = ({ data }) => {

    const getToDoTabItem = (_data, index) => {
        console.log(data[index]);
        return data[index];
    };

    const getToDoTabItemCount = () => {
        return data.length;
    };

    const getToDoTabKeyExtractor = (item, index) => {
        const keyName = 'todo' + item.id;
        
        return keyName;
    };

    const onPressByViewButton = () => {
        console.log('조회순 버튼 클릭');
        // fetch data code
    };

    const onPressByRecentButton = () => {
        console.log('최신순 버튼 클릭');
        // fetch data code
    };

    const searchConditionData = [
        { text: '조회순', handler: onPressByViewButton, },
        { text: '최신순', handler: onPressByRecentButton, },
    ];

    return (
        <VirtualizedList
                initialNumToRender={8}
                renderItem={({ item }) => {
                    return (
                        <ToDoListItem hasMainCategory={true} item={item} />
                    );
                }}
                keyExtractor={getToDoTabKeyExtractor}
                getItemCount={getToDoTabItemCount}
                getItem={getToDoTabItem}
                ItemSeparatorComponent={() => <View style={styles.separatorToDo} />}
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.searchConditionContainer}>
                            <AppText style={styles.searchConditionText}>검색 결과 {data.length}건</AppText>
                            <SearchCondition data={searchConditionData} />
                        </View>
                    );
                }}
                ListFooterComponent={() => <View style={styles.toDoFooter} />}
                style={styles.toDoContainer}
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

    toDoContainer: {
        paddingHorizontal: 24,
    },
    toDoFooter: {
        height: 60,
    },

    separatorToDo: {
        marginVertical: 10,
    },
});

export default SearchToDoView;