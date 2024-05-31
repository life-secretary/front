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
import { UserInfo, userInfoState } from '@/store/login';
import { createData } from '@/api/api';
import Toast from 'react-native-toast-message';

const Welcome = ({
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
    const userInfo = useRecoilValue(userInfoState);
    const convertStateToUser = (info: UserInfo) => {
        const { provider, providerId, email, nickname, year, month, day, gender, jobIds, interests, married, hasChild } = info;
        const noJobIds= jobIds.length === 1 && jobIds[0] === -1;
        return {
          provider,
          providerId,
          nickname,
          birthDate: `${year}-${month}-${day}`,
          gender: gender === "" ? null : gender,
          jobIds: noJobIds ? null : jobIds,
          interests,
          married,
          hasChild,
          email,
        };
      };

    const signup = async () => {
        const newInfo = convertStateToUser(userInfo)
        // console.log("signup", userInfo)
        const res = await createData('/auth/signUp', newInfo)
        .then(res => {
            // console.log(res)
            nextButtonHandler()
        })
        .catch(error => {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'sign up fail',
            });
        })
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