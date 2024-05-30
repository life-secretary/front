import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppText } from '@/components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';
import Agreement from '../init/Agreement';

import { getFontSize } from '@/utils/font';

import { useRecoilState } from 'recoil';
import { PROVIDERS, userInfoState } from '@/store/login';

import { 
    login,
    getProfile,
    KakaoProfile,
    KakaoOAuthToken
} from '@react-native-seoul/kakao-login';
import { 
    GoogleSignin,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';

export function Login({navigation}: any): React.JSX.Element {
    const [isLogin, setIsLogin] = useState(false);
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const [kakaoToken, setKakaoToken] = useState<KakaoOAuthToken>();
    const [kakaoProfile, setKakaoProfile] = useState<KakaoProfile>(); // id, nickname 사용가능

    const signInWithKakao = async(): Promise<void> => {
        console.log('카카오 로그인');
        try {
            const token: KakaoOAuthToken = await login();
            const profile: KakaoProfile = await getProfile();
            
            setKakaoToken(token);
            setKakaoProfile(profile);

            setUserInfo((previousValue: any) => {
                const newValue = Object.assign({}, previousValue);

                newValue.provider = PROVIDERS.KAKAO;
                newValue.providerId = profile.id;

                return newValue;
            })

            setIsLogin(true);
            setIsStartModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithGoogle = async(): Promise<void> => {
        console.log('구글 로그인');
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            
            // console.log('userInfo', userInfo);
            setUserInfo((previousValue: any) => {
                const newValue = Object.assign({}, previousValue);

                newValue.provider = PROVIDERS.GOOGLE;
                newValue.nickname = userInfo.user.name
                newValue.email = userInfo.user.email
                newValue.providerId = userInfo.user.id;

                return newValue;
            });

            setIsLogin(true);
            setIsStartModalOpen(true);
        } catch(error) {
            console.log('error', error);
        }
    }

    const onPressKakaoLoginButton = () => {
        signInWithKakao();
    };

    const onPressGoogleLoginButton = () => {
        signInWithGoogle();
    };

    const closeStartModal = () => {
        setIsStartModalOpen(false);
    };

    const closeStartProcess = () => {
        setIsStartModalOpen(false);
        navigation.navigate('HomeTab')
    };

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <AppText style={styles.logoText}>
                    <AppText style={styles.logoTextHighlight}>
                        처음 살아보는
                    </AppText> 나를 위한
                </AppText>
                <AppIcon 
                    name='logo'
                    width={146}
                    height={39}
                />
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    text='카카오 로그인'
                    textStyle={styles.buttonKakaoText}
                    buttonStyle={styles.buttonKakao}
                    startIcon={{
                        name: 'logoKakao',
                        width: 18,
                        height: 19,
                    }}
                    onPressButton={onPressKakaoLoginButton}
                />
                <AppButton 
                    text='Google 로그인'
                    textStyle={styles.buttonGoggleText}
                    buttonStyle={styles.buttonGoogle}
                    startIcon={{
                        name: 'logoGoogle',
                        width: 19,
                        height: 19,
                    }}
                    onPressButton={onPressGoogleLoginButton}
                />
            </View>
            <Agreement 
                isVisible={isStartModalOpen} 
                closeModalHandler={closeStartModal}
                closeStartProcess={closeStartProcess}
            />
            <Toast />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoContainer: {
        height: '60%',
        alignItems: 'center',
        gap: 10,
    },

    logoText: {        
        fontWeight: '600',
        fontSize: getFontSize(16),
        lineHeight: 20,
    },
    logoTextHighlight: {
        color: '#4681F6',
    },

    buttonContainer: {
        width: '90%',
        position: 'absolute',
        bottom: 0,
        gap: 10,
        paddingHorizontal: 24,
        zIndex: 9,
        paddingBottom: 60,
    },

    buttonKakao: {
        width: '100%',
        height: 51,

        flexDirection: 'row',
        gap: 12,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#FEE500'
    },
    buttonKakaoText: {
        fontWeight: '500',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: '#202020'
    },

    buttonGoogle: {
        width: '100%',
        height: 51,

        flexDirection: 'row',
        gap: 12,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#E5E5E5',
    },
    buttonGoggleText: {
        fontWeight: '500',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: '#202020'
    },

});