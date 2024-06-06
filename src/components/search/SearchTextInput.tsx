import React, { useState } from 'react';
import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View,
    TextInput,
    StyleSheet,
    Keyboard,
} from 'react-native';

import AppIcon from '../common/AppIcon';

const SearchTextInput = ({
    disabled = false,
    isSearchResultPage,
    searchText,
    changeSearchText,
    submitSearchText,
    pressRemoveSearchTextButton,
    pressSearchButton,
}: any): React.JSX.Element => {
    return (
        <KeyboardAvoidingView behavior={'padding'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.searchTextInputContainer}>
                    <View style={styles.searchTextInputWrapper}>
                        <TextInput
                            editable={!disabled}
                            placeholder='키워드를 입력해보세요' 
                            style={[styles.searchTextInput, isSearchResultPage ? styles.searchTextResultInput : {}]} 
                            placeholderTextColor={'#CBD3DC'}
                            value={searchText}
                            onChangeText={changeSearchText}
                            onSubmitEditing={submitSearchText}
                            returnKeyType='search'
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    {
                        !disabled &&
                        <View style={styles.searchIconWrapper}>
                            {
                                (searchText.length !== 0) ? 
                                <AppIcon 
                                    name='closeFillLight'
                                    width={36}
                                    height={36}
                                    onPress={pressRemoveSearchTextButton}
                                />
                                :
                                <></>
                            }
                            <AppIcon 
                                name='search'
                                width={36}
                                height={36}
                                onPress={pressSearchButton}
                            />
                        </View>
                    }
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    searchTextInputContainer: {
        justifyContent: 'center',
    },
    searchTextInputWrapper: {
        paddingVertical: 22,
    },
    searchTextInput: {
        height: 48,
        paddingLeft: 18,
        paddingRight: 48,
        borderRadius: 10,
        backgroundColor: '#F2F4F7',
    },
    searchTextResultInput: {
        height: 36,
    },
    searchIconWrapper: {
        position: 'absolute',
        flexDirection: 'row',
        alignSelf: 'flex-end',
        gap: 4,
        paddingRight: 8,
    },
});

export default SearchTextInput;