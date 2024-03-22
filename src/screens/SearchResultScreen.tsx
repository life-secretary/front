import React from 'react';
import {StatusBar, StyleSheet, View, Pressable, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {AppText} from '../components/common/AppText';
import AppIcon from '../components/common/AppIcon';

const SearchResultScreen = ({navigation}) => {
  /**
   *
   * 앱 디자인 고려, AppLayout 사용하지 않음
   *
   * 일단 컴포넌트 만들고 페이지 내부 혹은 screen 자체로 빼거나 재사용
   * 콘텐츠 / 할일 부터. (textInput 은 분리해서 생각.)
   *
   */

  return (
    <SafeAreaView>
      <StatusBar barStyle="default" />
      <AppHeader style={styles.headerContainer}>
        <View style={styles.headerWrapper}>
          <View style={styles.iconBackWrapper}>
            <AppIcon type="stroke" name="back" width={36} height={36} />
          </View>
          <View style={styles.textInputWrapper}>
            <TextInput
              placeholder="키워드를 입력해보세요"
              style={styles.textInputSearch}
              placeholderTextColor={'#CBD3DC'}
            />
            <View style={styles.textInputIconWrapper}>
              <Pressable>
                <AppIcon
                  type="fill"
                  name="closeFillLight"
                  width={36}
                  height={36}
                />
              </Pressable>
              <Pressable>
                <AppIcon type="stroke" name="search" width={36} height={36} />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="bookmarkDark" width={42} height={42} />
          <AppIcon
            type="fill"
            name="bookmarkDark"
            width={42}
            height={42}
            styles={{fill: '#000'}}
          />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="checkboxSquare" width={42} height={42} />
          <AppIcon
            type="fill"
            name="checkboxSquare"
            width={42}
            height={42}
            styles={{fill: '#0B2A4F'}}
          />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="addCircle" width={42} height={42} />
          <AppIcon type="stroke" name="checkBoxCircle" width={42} height={42} />
          <AppIcon
            type="fill"
            name="checkBoxCircle"
            width={42}
            height={42}
            styles={{fill: '#526070'}}
          />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="bookmarkLight" width={42} height={42} />
          <AppIcon
            type="fill"
            name="bookmarkLight"
            width={42}
            height={42}
            styles={{fill: '#A1ACB9'}}
          />
        </View>
        <View style={styles.container}>
          <AppIcon
            type="stroke"
            name="notificationOff"
            width={42}
            height={42}
          />
          <AppIcon type="stroke" name="notificationOn" width={42} height={42} />
        </View>
        <View style={styles.container}>
          <AppIcon type="fill" name="angleDown" width={42} height={42} />
          <AppIcon type="fill" name="angleUp" width={42} height={42} />
        </View>
        <View style={styles.container}>
          <AppIcon
            type="stroke"
            name="arrowRightLight"
            width={24}
            height={24}
          />
          <AppIcon type="stroke" name="arrowDownLight" width={24} height={24} />
          <AppIcon type="stroke" name="arrowRightDark" width={42} height={42} />
          <AppIcon type="stroke" name="arrowDownDark" width={42} height={42} />
          <AppIcon type="stroke" name="arrowUpDark" width={42} height={42} />
          <AppIcon type="stroke" name="arrowLeftDark" width={42} height={42} />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="addLight" width={24} height={24} />
          <AppIcon type="stroke" name="addLight" width={36} height={36} />
          <AppIcon type="stroke" name="addDark" width={42} height={42} />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="back" width={36} height={36} />
          <AppIcon type="stroke" name="back" width={42} height={42} />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="closeLight" width={36} height={36} />
          <AppIcon type="stroke" name="closeDark" width={36} height={36} />
          <AppIcon type="stroke" name="closeDark" width={42} height={42} />
        </View>
        <View style={styles.container}>
          <AppIcon type="fill" name="closeFillLight" width={36} height={36} />
          <AppIcon type="fill" name="closeFillDark" width={42} height={42} />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="search" width={36} height={36} />
          <AppIcon type="stroke" name="search" width={42} height={42} />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="reload" width={24} height={24} />
          <AppIcon type="stroke" name="edit" width={24} height={24} />
          <AppIcon type="stroke" name="trash" width={24} height={24} />
          <AppIcon type="stroke" name="hamburger" width={24} height={24} />
        </View>
        <View style={styles.container}>
          <AppIcon type="stroke" name="meatball" width={36} height={36} />
          <AppIcon type="stroke" name="setting" width={36} height={36} />
          <AppIcon type="stroke" name="balancer" width={42} height={42} />
          <AppIcon type="stroke" name="upload" width={42} height={42} />
        </View>
      </AppHeader>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white', // 임시 배경 처리
  },

  headerWrapper: {
    flexDirection: 'row',

    paddingHorizontal: 24,
  },

  iconBackWrapper: {
    flex: 1,
  },

  textInputWrapper: {
    flex: 8,
    width: '100%',
    justifyContent: 'center',
  },
  textInputSearch: {
    height: 36, // textInput 높이

    borderRadius: 8,
    paddingLeft: 14,
    paddingRight: 4,
    backgroundColor: '#F2F4F7',
  },
  textInputIconWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
  },

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchResultScreen;
