import React from 'react';
import {View, Image} from 'react-native';
import {AppLayout} from '@/components/common/AppLayout';
import {AppText} from '@/components/common/AppText';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import {styles} from '@/styles/survey';
import {useRecoilValue} from 'recoil';
import {
  UserInfo,
  loginInfoState,
  setTokens,
  userInfoState,
} from '@/store/login';
import {createData} from '@/api/api';
import Toast from 'react-native-toast-message';

const Welcome = ({navigation}: any) => {
  const userInfo = useRecoilValue(userInfoState);
  const loginInfo = useRecoilValue(loginInfoState);
  const convertStateToUser = (info: UserInfo) => {
    const {
      provider,
      providerId,
      email,
      nickname,
      ageRange,
      gender,
      jobIds,
      interests,
      married,
      hasChild,
    } = info;
    const noJobIds = jobIds.length === 1 && jobIds[0] === -1;
    return {
      provider,
      providerId,
      nickname,
      ageRange,
      // gender: gender === '' ? null : gender,
      gender,
      jobIds: noJobIds ? null : jobIds,
      interests,
      married,
      hasChild,
      email,
    };
  };

  const signup = async () => {
    const newInfo = convertStateToUser(userInfo);
    const res = await createData('/auth/signUp', newInfo)
      .then(res => {
        signIn();
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          type: 'error',
          props: {
            text: '회원가입에 실패했어요',
            style: {marginTop: 20},
          },
          position: 'top',
          topOffset: 40,
          visibilityTime: 2000,
          autoHide: true,
        });
      });
  };

  const signIn = async (): Promise<void> => {
    await createData('/auth/login', loginInfo)
      .then(res => {
        return res.data.data;
      })
      .then(data => {
        let accessToken = data.data.accessToken;
        let refreshToken = data.data.refreshToken;
        if (accessToken === null) {
          throw Error('no token');
        }
        setTokens(accessToken, refreshToken).then(() => {
          navigation.navigate('Splash');
        });
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          type: 'error',
          props: {
            text: '로그인에 실패했어요',
            style: {marginTop: 20},
          },
          position: 'top',
          topOffset: 40,
          visibilityTime: 2000,
          autoHide: true,
        });
        navigation.navigate('Splash');
      });
  };

  return (
    <AppLayout style={styles.container}>
      <AppHeader style={[styles.headerContainer, {marginTop: 0}]}>
        <AppIcon
          name="back"
          width={42}
          height={42}
          onPress={() => navigation.navigate('GetMarriage')}
        />
      </AppHeader>
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <AppText style={styles.welcomeText}>어서오세요! 인생비서에</AppText>
          <AppText style={styles.welcomeText}>오신것을 환영합니다</AppText>
        </View>
      </View>
      <View>
        <View
          style={{
            position: 'absolute',
            left: 10,
            top: 30,
          }}>
          <Image
            source={require('@/assets/gif/happy_birthday.gif')}
            style={styles.imageBirthDay}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            left: '-8%',
            top: 200,
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
          text="시작하기"
          textStyle={styles.nextButtonText}
          buttonStyle={styles.nextButton}
          onPressButton={signup}
        />
      </View>
    </AppLayout>
  );
};

export default Welcome;
