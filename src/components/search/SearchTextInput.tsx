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
    isSearchResultPage,
    defaultValue = '',
    changeSearchText,
    submitSearchText,
    pressRemoveSearchTextButton,
    pressSearchButton,
}): React.JSX.Element => {

    const [text, setText] = useState(defaultValue);

    const changeText = (text) => {
        setText(text);

        changeSearchText(text);
    };

    const submitText = (event) => {
        submitSearchText(event);
    };

    const pressRemoveTextIcon = () => {
        setText('');

        pressRemoveSearchTextButton();
    };

    const pressSearchIcon = () => {
        pressSearchButton();
    };

    return (
        <KeyboardAvoidingView behavior={'padding'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.searchTextInputContainer}>
                    <View style={styles.searchTextInputWrapper}>
                        <TextInput
                            editable
                            placeholder='키워드를 입력해보세요' 
                            style={[styles.searchTextInput, isSearchResultPage ? styles.searchTextResultInput : {}]} 
                            placeholderTextColor={'#CBD3DC'}
                            value={text}
                            onChangeText={changeText}
                            onSubmitEditing={submitText}
                            returnKeyType='search'
                            underlineColorAndroid='transparent'
                        />
                    </View>
                    <View style={styles.searchIconWrapper}>
                        {
                            (text.length !== 0) ? 
                            <AppIcon 
                                type='fill'
                                name='closeFillLight'
                                width={36}
                                height={36}
                                onPress={pressRemoveTextIcon}
                            />
                            :
                            <></>
                        }
                        <AppIcon 
                            type='stroke'
                            name='search'
                            width={36}
                            height={36}
                            onPress={pressSearchIcon}
                        />
                    </View>
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
        paddingRight: 4,
    },
});

export default SearchTextInput;