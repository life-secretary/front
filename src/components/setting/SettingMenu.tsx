import React from 'react';

import {StyleSheet, View, FlatList} from 'react-native';
import {SettingMenuItem} from '@/components/setting/SettingMenuItem';

type SettingMenuProps = {
  settingMenuList: object[];
};

export function SettingMenu({
  settingMenuList,
}: SettingMenuProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={settingMenuList}
        renderItem={({item}) => <SettingMenuItem settingMenu={item} />}
        keyExtractor={item => item.key}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  listContainer: {
    gap: 12,
  },
});
