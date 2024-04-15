import React from 'react';

import {StyleSheet, View, FlatList} from 'react-native';
import {MyInfoMenuItem} from '@/components/setting/my/MyInfoMenuItem';
import color from '@/styles/color';
import spacing from '@/styles/spacing';

const MY_INFO_MENU = [
  [
    {
      key: 'edit',
      title: '내 정보 수정',
      icon: {name: 'arrowRight', width: 36, height: 36},
    },
    {
      key: 'resurvey',
      title: '관심사 재입력',
      icon: {name: 'arrowRight', width: 36, height: 36},
    },
  ],
  [
    {key: 'logout', title: '로그아웃'},
    {key: 'withdrawal', title: '회원탈퇴'},
  ],
];

type MyInfoMenuProps = {
  user: object;
};

export function MyInfoMenu({user}: MyInfoMenuProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={MY_INFO_MENU[0]}
        renderItem={({item}) => (
          <MyInfoMenuItem myInfoMenu={item} user={user} />
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.divider} />
      <FlatList
        scrollEnabled={false}
        data={MY_INFO_MENU[1]}
        renderItem={({item}) => (
          <MyInfoMenuItem myInfoMenu={item} user={user} />
        )}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.layoutPaddingHorizontal,
  },
  listContainer: {
    marginVertical: 20,
    gap: 12,
  },
  divider: {
    backgroundColor: color.grey.grey100,
    height: 1,
  },
});
