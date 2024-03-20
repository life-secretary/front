import React from 'react';
import { VirtualizedList, View, StyleSheet } from 'react-native';

import ToDoListItem from './ToDoListItem';

const SearchToDoView = ({ 
    data,
    headerComponent,
}) => {

    const getToDoTabItem = (_data, index) => {
        return data[index];
    };

    const getToDoTabItemCount = () => {
        return data.length;
    };

    const getToDoTabKeyExtractor = (item, index) => {
        const keyName = 'todo' + item.id;
        
        return keyName;
    };

    return (
        <VirtualizedList
            initialNumToRender={8}
            renderItem={({ item }) => {
                return (
                    <ToDoListItem 
                        hasMainCategory={true} 
                        item={item} 
                    />
                );
            }}
            keyExtractor={getToDoTabKeyExtractor}
            getItemCount={getToDoTabItemCount}
            getItem={getToDoTabItem}
            ListHeaderComponent={() => headerComponent}
            ListFooterComponent={() => <View style={styles.toDoFooter} />}
            ItemSeparatorComponent={() => <View style={styles.separatorToDo} />}
            style={styles.toDoContainer}
        />
    );
};

const styles = StyleSheet.create({
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