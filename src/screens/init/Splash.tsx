import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppText } from '@/components/common/AppText';

import { getFontSize } from '@/utils/font';

import { LoginInfo, PROVIDERS, providerKey } from '@/store/login';

import { 
    getProfile,
} from '@react-native-seoul/kakao-login';
import { 
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import { createData } from '@/api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { removeToken, setToken } from '@/api/axios';

export function Splash({navigation}: any): React.JSX.Element {
    const isFocused = useIsFocused();

    const signInWithKakao = async(): Promise<void> => {
        console.log('카카오 로그인');
        try {
            await getProfile()
            .then(res => {
                // console.log('userInfo', res);
                if (res === null) {
                    //??
                } else {
                    //TODO: change
                    const loginInfo: LoginInfo = {
                        provider: "kakao",
                        idToken: String(res.id)
                    };
                    signIn(loginInfo)
                }
            })
            .catch(error => {
                if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                // user has not signed in yet
                navigation.navigate('Login')
            } else {
                Toast.show({
                    type: error,
                    text1: "login fail" + error.code
                })
            }
        });
        } catch (error) {
            console.log(error);
        }
    };

    const googleSigninConfigure = () => {
        GoogleSignin.configure({
        webClientId: Config.GOOGLE_AUTH_WEB_ID,
        iosClientId: Config.GOOGLE_AUTH_IOS_ID,
      });
    };
    
    const startLogin = async () => {
        try {
            removeToken()
            const value = await AsyncStorage.getItem(providerKey)
            console.log("value", value)
            if (value === PROVIDERS.GOOGLE) {
                signInWithGoogle();
            } else if (value === PROVIDERS.KAKAO) {
                signInWithKakao();
            } else {
                navigation.navigate('Login')
            }
        } catch (e) {
            console.log("e", e)
            navigation.navigate('Login')
        }
    }

    useEffect(() => {
        //1. check storage
        //2. login in silence
        // if expire ->login
        //3. call login api
        //5. add token to header
        
        googleSigninConfigure();
        startLogin();
    }, [isFocused]);


    const signIn = async(info: LoginInfo): Promise<void> => {
        console.log("signIn", info)
        await createData('/auth/login', info)
        .then(res => {
            return res.data.data
        })
        .then(data => {
            if (data.data.token === null) {
                throw Error("no token")
            }
            setToken(data.data.token)
            setTimeout(() => {
                navigation.navigate('HomeTab')
            }, 1000);
        })
        .catch(error => {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'login fail',
            });
            navigation.navigate('HomeTab')
        })
    }

    const signInWithGoogle = async(): Promise<void> => {
        console.log('구글 로그인');
        try {
            await GoogleSignin.signInSilently()
                .then(res => {
                    console.log('userInfo', res);
                    if (res.idToken === null) {
                        //??
                    } else {
                        const loginInfo: LoginInfo = {
                            provider: "google",
                            idToken: res.idToken
                        };
                        signIn(loginInfo)
                    }
                })
                .catch(error => {
                    if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                    // user has not signed in yet
                    navigation.navigate('Login')
                } else {
                    Toast.show({
                        type: error,
                        text1: "login fail" + error.code
                    })
                }
            });
            
        } catch(error) {
            console.log('error', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{flex: 1}}/>
            <View style={styles.logoContainer}>
                <AppText style={styles.logoText}>
                    <AppText style={styles.logoTextHighlight}>
                        처음 살아보는
                    </AppText> 나를 위한
                </AppText>
                <AppText style={styles.title}>
                    인생비서
                </AppText>
            </View>
            {/* <Agreement 
                isVisible={isStartModalOpen} 
                closeModalHandler={closeStartModal}
                closeStartProcess={closeStartProcess}
            /> */}
            <Toast />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000E24',
    },

    logoContainer: {
        flex: 2,
        alignItems: 'center',
        gap: 10,
    },

    logoText: {        
        fontWeight: '600',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: 'white',
    },

    title: {        
        fontWeight: '600',
        fontSize: getFontSize(44),
        color: 'white',
    },

    logoTextHighlight: {
        color: '#4681F6',
    },

});