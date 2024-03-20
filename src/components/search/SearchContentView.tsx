import React from 'react';
import { VirtualizedList, View, StyleSheet } from 'react-native';

import { HomeContentsItem } from '../../components/home/homeContents/HomeContentsItem';

const SearchContentView = ({ 
    data,
    headerComponent,
}) => {

    const getContentTabItem = (_data, index) => {
        return data[index];
    };

    const getContentTabItemCount = () => {
        return data.length;
    };

    const getContentTabKeyExtractor = (item, index) => {
        const keyName = 'content' + item.id;
        
        return keyName;
    };

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
            ListHeaderComponent={() => headerComponent}
            ListFooterComponent={() => <View style={styles.contentFooter} />}
            ItemSeparatorComponent={() => <View style={styles.separatorContent} />}
            style={styles.contentContainer}
        />
    );
};

const styles = StyleSheet.create({
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