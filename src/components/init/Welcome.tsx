import React from 'react';
import { 
    View,
    Image,
} from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { styles } from '../../screens/init/Survey';
import type { SurveyProccessProps } from '../../screens/init/Survey';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@/store/login';
import { createData } from '@/api/api';
import Toast from 'react-native-toast-message';

const Welcome = ({
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
    const userInfo = useRecoilValue(userInfoState);
    const createUserInfo = async (info: object) => {
        const res = await createData('/signUp', info);
        console.log(res)
        if (res.status === 200) {
            nextButtonHandler();
        } else {
            Toast.show({
                type: 'error',
                text1: 'sign up fail',
                text2: "error" + res.status
            });
        }
    };

    function signup() {
        const { year, month, day } = userInfo;
        const birthDate = `${year}-${month}-${day}`;
        const newInfo = { ...userInfo, birthDate };
        console.log("signup", userInfo)
        createUserInfo(newInfo)
    }
    
    return (
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
                    <AppText style={styles.welcomeText}>어서오세요! 인생비서에</AppText>
                    <AppText style={styles.welcomeText}>오신것을 환영합니다</AppText>
                </View>
            </View>
            <View>
                <View style={{
                    position: 'absolute',
                    left: -10,
                    top: -30,
                }}>
                    <Image 
                        source={require('@/assets/gif/happy_birthday.gif')}
                        style={styles.imageBirthDay}
                    />
                </View>
                <View style={{
                    position: 'absolute',
                    left: '-15%',
                    top: 100,
                    zIndex: 1,
                }}>
                    <Image 
                        source={require('@/assets/gif/people_using_robots.gif')}
                        style={styles.imagePersonRobot}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    text='시작하기'
                    textStyle={styles.nextButtonText}
                    buttonStyle={styles.nextButton}
                    onPressButton={signup}
                />
            </View>
        </View>
    );
};

export default Welcome;