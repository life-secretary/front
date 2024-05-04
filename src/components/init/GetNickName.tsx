import React, { useEffect, useState } from 'react';
import { 
    View, 
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { useRecoilState } from 'recoil';
import { userInfoState } from '@/store/login';

import { styles } from '../../screens/init/Survey';
import type { SurveyProccessProps } from '../../screens/init/Survey';

const GetNickName = ({
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [isError, setIsError] = useState(true)

    const onChangeTextInput = ({ nativeEvent }: any) => {
        const checkHasSpecialText = new RegExp(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/ ]/, 'gim');

        const { text } = nativeEvent;

        if (
            text.match(checkHasSpecialText) !== null ||
            text.length > 6 || text.length === 0
        ) {
            setIsError(true);
        } else {
            setIsError(false);
        }

        setUserInfo((previousValue) => {
            return {
                ...previousValue, 
                nickname: text,
            };
        });
    };

    useEffect(() => {
        setIsError(false);
    }, []);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyBoardAvoidingContainer}
        >
            <View style={styles.container}>
                <AppHeader style={styles.headerContainer}>
                    <AppIcon
                        name='back'
                        width={42}
                        height={42}
                        onPress={backButtonHandler}
                    />
                </AppHeader>
                <View>
                    <View style={styles.textContainer}>
                        <AppText style={styles.titleText}>닉네임을 알려주세요</AppText>
                        <AppText style={styles.subTitleText}>공백없이 6자 내로 입력할 수 있어요 (특수문자 불가)</AppText>
                    </View>
                </View>
                <TextInput
                    value={userInfo.nickname}
                    onChange={onChangeTextInput}
                    style={[styles.textInput, isError ? styles.textInputError : {}]}
                    autoFocus={true}
                />
                <View style={styles.buttonContainer}>
                    <AppButton 
                        text='다음'
                        textStyle={styles.nextButtonText}
                        buttonStyle={[styles.nextButton, isError ? styles.nextButtonDisabled : {}]}
                        disabled={isError}
                        onPressButton={isError ? () => {} : () => nextButtonHandler()}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

export default GetNickName;