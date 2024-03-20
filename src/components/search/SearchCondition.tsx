import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import AppButton from '../common/AppButton';

import { getFontSize } from '../../utils/font';

const SearchCondition = ({ data }) => {

    // const data = [
    //     { text: '조회순', handler: () => {}, },
    //     { text: '저장순', handler: () => {}, },
    //     { text: '최신순', handler: () => {}, },
    // ];

    const [isSelected, setIsSelected] = useState(data.map((item) => false));

    const onPressButton = (number: number) => {
        setIsSelected((previousValue) => {
            const currentValue = previousValue.map((item, index) => {
                if (index === number) {
                    return true;
                }

                return false;
            });

            return currentValue;
        })
    };

    useEffect(() => {
        setIsSelected((previousValue) => {
            previousValue[0] = true;

            return previousValue.slice();
        })
    }, [])

    return (
        <View style={styles.searchConditionContainer}>
            {data.map((item, index) => {
                return <AppButton 
                    key={`searchCondition${index}`} 
                    text={item.text} 
                    textStyle={[
                        styles.searchConditionText, 
                        isSelected[index] === true ? styles.searchConditionTextSelected : {}
                    ]} 
                    onPressButton={() => {item.handler(), onPressButton(index)}}
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