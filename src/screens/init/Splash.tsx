import React, {useEffect} from 'react';
import {View, StyleSheet, Alert, AlertButton, Linking} from 'react-native';
import {AppLayout} from '@/components/common/AppLayout';
import {AppText} from '@/components/common/AppText';

import {getFontSize} from '@/utils/font';

import {
  getLastNoticeId,
  getRefreshToken,
  setLastNoticeId,
  setTokens,
} from '@/store/login';

import Toast from 'react-native-toast-message';
import {createData, fetchData} from '@/api/api';
import {useIsFocused} from '@react-navigation/native';
import {removeToken} from '@/api/axios';
import AppVersionInfo, {
  appStoreLink,
  compareVersions,
  getLatestVersion,
} from './AppVersion';
import DeviceInfo from 'react-native-device-info';
import {fetch} from '@react-native-community/netinfo';

export function Splash({navigation}: any): React.JSX.Element {
  const isFocused = useIsFocused();

  function showAlert(title: string, message: string): Promise<void> {
    return new Promise(resolve => {
      Alert.alert(title, message, [{text: '확인', onPress: () => resolve()}], {
        cancelable: false,
      });
    });
  }

  async function hasVersionUpdate() {
    let shouldUpdate = false;
    const res = await getLatestVersion();
    const latest = res.data.data as AppVersionInfo;
    const hasNewer =
      compareVersions(latest.version, DeviceInfo.getVersion()) === 1;
    shouldUpdate = hasNewer && latest.showAlert;
    //TODO: os type check
    if (shouldUpdate) {
      const buttons: Array<AlertButton> = [
        {
          text: '업데이트',
          onPress: () => {
            Linking.openURL(appStoreLink);
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
          onDismiss: () => {},
        },
      );
    }
    return shouldUpdate;
  }

  const fetchNotice = async () => {
    try {
      const response = await fetchData('/notice/latest', null);
      const notice = response.data.data;
      const lastId = await getLastNoticeId();
      if (lastId == null) {
        throw new Error('Failed to retrieve last notice ID');
      }
      if (notice.id > lastId) {
        return notice;
      } else {
        return Promise.resolve();
      }
    } catch (error) {
      console.error(error);
      return Promise.resolve();
    }
  };

  const authToken = async (token: string): Promise<void> => {
    const req = {
      refreshToken: token,
    };
    await createData('/auth/refresh-token', req)
      .then(res => {
        return res.data.data;
      })
      .then(data => {
        if (data.accessToken === null) {
          throw Error('no token');
        }
        let accessToken = data.accessToken;
        let refreshToken = data.refreshToken;
        setTokens(accessToken, refreshToken);
        setTimeout(() => {
          navigation.navigate('HomeTab');
        }, 200);
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
      const refreshToken = await getRefreshToken();
      if (refreshToken !== null) {
        authToken(refreshToken);
      } else {
        navigation.navigate('Login');
      }
    } catch (e) {
      console.log('something wrong', e);
      navigation.navigate('Login');
    }
  };

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    fetch()
      .then(state => {
        if (!state.isConnected) {
          showAlert(
            '셀룰러 데이터가 꺼져 있음',
            '데이터에 접근하려면, 셀룰러 데이터를 켜거나 Wi-Fi를 사용하십시오.',
          );
        }
      })
      .then(() => {
        return hasVersionUpdate();
      })
      .then(shouldUpdate => {
        if (shouldUpdate) {
          return Promise.reject('Update required');
        }
        return fetchNotice();
      })
      .then(notice => {
        if (notice && notice.showPopup) {
          return showAlert(notice.title, notice.message).then(() => {
            setLastNoticeId(notice.id.toString());
            notice;
          });
        }
        return notice;
      })
      .then(notice => {
        startLogin();
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 502 || error.response.status === 404) {
          showAlert('', '현재 서비스를 이용할 수 없습니다.');
        }
      });
  }, [isFocused]);

  return (
    <AppLayout style={styles.container}>
      <View style={{flex: 1}} />
      <View style={styles.logoContainer}>
        <AppText style={styles.logoText}>
          <AppText style={styles.logoTextHighlight}>처음 살아보는</AppText> 나를
          위한
        </AppText>
        <AppText style={styles.title}>인생비서</AppText>
      </View>
      <Toast />
    </AppLayout>
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
