import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet, View} from 'react-native';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROVIDERS, clearAuth, providerKey} from '@/store/login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {logout} from '@react-native-seoul/kakao-login';
import {useResetRecoilState} from 'recoil';
import {userState} from '@/store/userState';
import {todoListState} from '@/store/todoState';
import {scrapListState} from '@/store/scrapState';

type Props = {
  myInfoMenu: object;
};

export function MyInfoMenuItem({myInfoMenu}: Props): React.JSX.Element {
  const resetUserInfo = useResetRecoilState(userState);
  const resetTodoList = useResetRecoilState(todoListState);
  const resetScrapList = useResetRecoilState(scrapListState);
  const navigation = useNavigation();

  const resetMyInfo = () => {
    resetUserInfo();
    resetTodoList();
    resetScrapList();
  };

  const startLogout = async () => {
    try {
      const value = await AsyncStorage.getItem(providerKey);
      if (value === PROVIDERS.GOOGLE) {
        await GoogleSignin.signOut();
      } else if (value === PROVIDERS.KAKAO) {
        await logout();
      }
    } catch (e) {
      console.log('e', e);
    }
  };

  const handleButtonPress = (menu: object) => {
    if (menu?.key === 'logout') {
      startLogout().then(() => {
        clearAuth()
      })
      .then(() => {
        resetMyInfo();
        navigation.navigate('Splash');
      });
      return;
    }

    if (menu?.key === 'resurvey') {
      navigation.navigate('GetCategory', {modify: true, from: 'myInfo'});
      return;
    }

    navigation.navigate('MyInfoModal', {
      headerTitle: menu?.title,
      menu,
    });
  };

  return (
    <View style={styles.container}>
      <AppButton
        text={myInfoMenu?.title}
        textStyle={styles.title}
        onPressButton={() => handleButtonPress(myInfoMenu)}
      />
      {myInfoMenu?.icon && (
        <View style={styles.button}>
          <AppIcon
            name={myInfoMenu?.icon?.name}
            width={myInfoMenu?.icon?.width}
            height={myInfoMenu?.icon?.height}
            onPress={() => handleButtonPress(myInfoMenu)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 36,
  },
  title: {
    fontWeight: font.fontWeight.medium,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
});
