import React from 'react';
import {
    View,
    Pressable,
    StyleSheet,
} from 'react-native';

import { AppText } from '../common/AppText';

import { getFontSize } from '../../utils/font';

const SearchTab = ({
    tabData,
}) => {
    return (
        <View style={styles.tabContainer}>
            {
                tabData.map((item, index) => {
                    return (
                        <Pressable 
                            key={`searchTab${index}`}
                            style={styles.tabButtonContainer} 
                            onPress={() => item.handler(index)}
                        >
                            <View style={[
                                styles.tabButtonTextContainer, 
                                item.isPressed ? {} : styles.tabButtonTextContainerDisplay
                            ]}>
                                <AppText>{item.text}</AppText>
                            </View>
                        </Pressable>
                    );
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer : {
        height: 42,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tabButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonTextContainer: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: 'black'
    },
    tabButtonTextContainerDisplay: {
        borderBottomColor: 'transparent'
    },
    tabButtonText: {
        fontWeight: '600',
        fontSize: getFontSize(15),
        lineHeight: 18,
    },
});

export default SearchTab;