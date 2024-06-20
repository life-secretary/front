import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {AppText} from '@/components/common/AppText';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import {getFontSize} from '@/utils/font';

import {useRecoilState} from 'recoil';
import {
  LoginInfo,
  PROVIDERS,
  providerKey,
  setTokens,
  userInfoState,
} from '@/store/login';

import {
  login,
  getProfile,
  KakaoProfile,
  KakaoOAuthToken,
} from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createData} from '@/api/api';
import Config from 'react-native-config';

export function Login({navigation}: any): React.JSX.Element {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const [kakaoToken, setKakaoToken] = useState<KakaoOAuthToken>();
  const [kakaoProfile, setKakaoProfile] = useState<KakaoProfile>();

  const storeProvider = async (value: string) => {
    try {
      await AsyncStorage.setItem(providerKey, value);
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

  const signInWithKakao = async (): Promise<void> => {
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
      });
      storeProvider(PROVIDERS.KAKAO);
      const loginInfo: LoginInfo = {
        provider: 'kakao',
        idToken: token.idToken!!,
      };
      signIn(loginInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const signInWithGoogle = async (): Promise<void> => {
    console.log('구글 로그인');
    try {
      googleSigninConfigure();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      // console.log('userInfo', userInfo);
      setUserInfo((previousValue: any) => {
        const newValue = Object.assign({}, previousValue);

        newValue.provider = PROVIDERS.GOOGLE;
        newValue.nickname = userInfo.user.name;
        newValue.email = userInfo.user.email;
        newValue.providerId = userInfo.user.id;

        return newValue;
      });
      storeProvider(PROVIDERS.GOOGLE);
      const loginInfo: LoginInfo = {
        provider: 'google',
        idToken: userInfo.idToken!!,
      };
      signIn(loginInfo);
    } catch (error) {
      console.log('error', error);
    }
  };

  const signIn = async (info: LoginInfo): Promise<void> => {
    // console.log('signIn', info);
    await createData('/auth/login', info)
      .then(res => {
        return res.data.data;
      })
      .then(data => {
        let accessToken = data.data.accessToken;
        let refreshToken = data.data.refreshToken;
        if (accessToken === null) {
          throw Error('no token');
        }
        setTokens(accessToken, refreshToken);
        //전에 가입한 사용자
        closeStartProcess();
      })
      .catch(error => {
        //기존 가입된 유저가 아니면 회원가입으로 넘어갑니다.
        console.log(error);
        setIsLogin(true);
        navigation.navigate('Agreement');
      });
  };

  const onPressKakaoLoginButton = () => {
    signInWithKakao();
  };

  const onPressGoogleLoginButton = () => {
    signInWithGoogle();
  };

  const closeStartProcess = () => {
    navigation.navigate('Splash');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <AppText style={styles.logoText}>
          <AppText style={styles.logoTextHighlight}>처음 살아보는</AppText> 나를
          위한
        </AppText>
        <AppIcon name="logo" width={146} height={39} />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          text="카카오 로그인"
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
          text="Google 로그인"
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
      <Toast />
    </View>
  );
}

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
    backgroundColor: '#FEE500',
  },
  buttonKakaoText: {
    fontWeight: '500',
    fontSize: getFontSize(16),
    lineHeight: 20,
    color: '#202020',
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
    color: '#202020',
  },
});
