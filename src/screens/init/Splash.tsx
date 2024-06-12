import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, AlertButton } from 'react-native';

import { AppText } from '@/components/common/AppText';

import { getFontSize } from '@/utils/font';

import { getRefreshToken, setTokens } from '@/store/login';

import Toast from 'react-native-toast-message';
import { createData } from '@/api/api';
import { useIsFocused } from '@react-navigation/native';
import { removeToken } from '@/api/axios';
import AppVersionInfo, { compareVersions, getLatestVersion } from './AppVersion';
import DeviceInfo from 'react-native-device-info';

export function Splash({ navigation }: any): React.JSX.Element {
  const isFocused = useIsFocused();

  async function hasVersionUpdate() {
    let shouldUpdate = false
    try {
      const res = await getLatestVersion()
      const latest = res.data.data as AppVersionInfo
      // console.log(latest.version)
      // console.log(DeviceInfo.getVersion())
      const hasNewer = compareVersions(latest.version, DeviceInfo.getVersion()) === 1
      shouldUpdate = hasNewer && latest.showAlert
      //TODO: os type check
      if (shouldUpdate) {
        const buttons: Array<AlertButton> = [
          {
            text: '업데이트',
            onPress: () => {
              // TODO: go to appstore
            },
            style: 'destructive',
          },
        ];

        if (!latest.critical) {
          buttons.unshift({
            text: '나중에',
            onPress: () => {
              startLogin();
            },
            style: 'cancel',
          });
        }

        Alert.alert(
          '업데이트',
          '더 나은 환경을 제공하기 위해\n 최신버전으로 업데이트가 필요합니다',
          buttons,
          {
            cancelable: true,
            onDismiss: () => { },
          }
        );
      }
    } catch (e) {
      console.log('e', e);
    }
    return shouldUpdate
  }

  const authToken = async (token: string): Promise<void> => {
    console.log('authToken');
    const req = {
      refreshToken: token
    };
    await createData('/auth/refresh-token', req)
      .then(res => {
        return res.data.data;
      })
      .then(data => {
        if (data.accessToken === null) {
          throw Error('no token');
        }
        let accessToken = data.accessToken
        let refreshToken = data.refreshToken
        setTokens(accessToken, refreshToken)
        setTimeout(() => {
          navigation.navigate('HomeTab');
        }, 1000);
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: '토큰이 만료되었습니다.',
        });
        setTimeout(() => {
          navigation.navigate('Login');
        }, 1000);
      });
  };

  const startLogin = async () => {
    try {
      removeToken();
      const refreshToken = await getRefreshToken()
      // console.log('refreshToken', refreshToken);
      if (refreshToken !== null) {
        authToken(refreshToken)
      } else {
        //토큰 만료
        navigation.navigate('Login');
      }
    } catch (e) {
      console.log('something wrong', e);
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    if (!isFocused) {
      return
    }
    hasVersionUpdate()
      .then((shouldUpdate) => {
        console.log("shouldUpdate", shouldUpdate)
        if (!shouldUpdate) {
          startLogin()
        }
      })
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <View style={styles.logoContainer}>
        <AppText style={styles.logoText}>
          <AppText style={styles.logoTextHighlight}>처음 살아보는</AppText> 나를
          위한
        </AppText>
        <AppText style={styles.title}>인생비서</AppText>
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
