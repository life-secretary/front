import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AppButton from '../common/AppButton';
import { getFontSize } from '../../utils/font';
import type { ConditionData } from '../search/SearchCategory';

type SearchConditionProps = {
    data: Array<ConditionData>;
    onPressButton: Function;
};

const SearchCondition = ({ 
    data,
    onPressButton,
}: SearchConditionProps): React.JSX.Element => {
    return (
        <View style={styles.searchConditionContainer}>
            {data.map((item, index) => {
                return <AppButton 
                    key={`searchCondition${index}`} 
                    text={item.text} 
                    textStyle={[
                        styles.searchConditionText, 
                        item.isSelected === true ? styles.searchConditionTextSelected : {}
                    ]} 
                    onPressButton={() => onPressButton(item, index)}
                />
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    searchConditionContainer: {
        flexDirection: 'row', 
        gap: 14,
    },
    searchConditionText: {
        fontWeight: '500',
        fontSize: getFontSize(14),
        lineHeight: 17,
        color: '#A1ACB9',
    },
    searchConditionTextSelected: {
        color: '#40474F'
    },
});

export default SearchCondition;