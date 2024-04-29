import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { AppText } from '@/components/common/AppText';
import AppModal from '@/components/common/modal/AppModal';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { getFontSize } from '@/utils/font';

import Agreement from '../init/Agreement';

import { 
    login,
    getProfile,
    KakaoProfile,
    KakaoOAuthToken
} from '@react-native-seoul/kakao-login';
import { 
    GoogleSignin,
    GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

// @ref[google oauth] https://github.com/react-native-google-signin/google-signin

// Test
import axios from 'axios';

type LoginProps = {
    isVisible: boolean;
    closeAllProcess: () => void;
};

const Login = ({
    isVisible,
    closeAllProcess,
}: LoginProps): React.JSX.Element => {

    const [isLogin, setIsLogin] = useState(false);
    const [isStartModalOpen, setIsStartModalOpen] = useState(false);

    const [kakaoToken, setKakaoToken] = useState<KakaoOAuthToken>();
    const [kakaoProfile, setKakaoProfile] = useState<KakaoProfile>(); // id, nickname 사용가능

    const signInWithKakao = async(): Promise<void> => {
        try {
            const token: KakaoOAuthToken = await login();
            const profile: KakaoProfile = await getProfile();
            
            setKakaoToken(token);
            setKakaoProfile(profile);
            setIsLogin(true);
            setIsStartModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithGoogle = async(): Promise<void> => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            // TODO Client ID 적용 시간 걸려서 잠시 hold
            // console.log('userInfo', userInfo);
            setIsLogin(true);
            setIsStartModalOpen(true);
        } catch(error) {
            console.log('error', error);
        }
    }

    const onPressKakaoLoginButton = () => {
        console.log('카카오 로그인 테스트');
        signInWithKakao();
    };

    const onPressGoogleLoginButton = () => {
        console.log('구글 로그인 테스트');
        signInWithGoogle();
    };

    const onPressAppleLoginButton = () => {
        setIsLogin(true);
        setIsStartModalOpen(true);
    };

    const closeStartModal = () => {
        setIsStartModalOpen(false);
    };

    const closeStartProcess = () => {
        setIsStartModalOpen(false);
        closeAllProcess();
    };

    return (
        <AppModal isVisible={isVisible}>
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
                    <AppButton 
                        text='Apple 로그인'
                        textStyle={styles.buttonAppleText}
                        buttonStyle={styles.buttonApple}
                        startIcon={{
                            name: 'logoApple',
                            width: 15,
                            height: 16,
                        }}
                        onPressButton={onPressAppleLoginButton}
                    />
                    <View style={styles.loginHelpTextContainer}>
                        <AppButton 
                            text='로그인에 어려움이 있나요?'
                            textStyle={styles.loginHelpText}
                        />
                    </View>
                </View>
            </View>
            <Agreement 
                isVisible={isStartModalOpen} 
                closeModalHandler={closeStartModal}
                closeStartProcess={closeStartProcess}
            />
        </AppModal>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center'
    },

    logoContainer: {
        height: '60%',

        alignItems: 'center',
        gap: 10,

        paddingTop: 60,
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
        position: 'absolute',
        bottom: 0,
        gap: 10,
        paddingHorizontal: 24,
        zIndex: 9,
    },

    buttonKakao: {
        width: '100%',

        flexDirection: 'row',
        gap: 12,

        paddingHorizontal: 106,
        paddingVertical: 16,
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

        flexDirection: 'row',
        gap: 12,

        paddingHorizontal: 106,
        paddingVertical: 16,
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

    buttonApple: {
        width: '100%',

        flexDirection: 'row',
        gap: 12,

        paddingHorizontal: 106,
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: '#202020'
    },
    buttonAppleText: {
        fontWeight: '500',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: '#FFFFFF'
    }, 

    loginHelpTextContainer: {
        paddingVertical: 20,
        ...Platform.select({
            ios: {
                paddingTop: 20,
                paddingBottom: 35,   
            }
        })
    },
    loginHelpText: {
        textAlign: 'center',

        fontWeight: '400',
        fontSize: getFontSize(13),
        lineHeight: 16,
        color: '#40474F',
        textDecorationLine: 'underline',
    },
});

export default Login;