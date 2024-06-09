import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {AppDivider} from '@/components/common/AppDivider';
import AppIcon from '@/components/common/AppIcon';
import {font} from '@/styles/font';

import openSourceLicense from '@/openSourceLicense.json';

type LicenseInfo = {
  libraryName: string;
  version: string;
  _license: string;
  _description: string;
  homepage: string;
  author: string;
  repository: {
    type: string;
    url: string;
  };
  _licenseContent: string;
};

function License({
  libraryName,
  version,
  _license,
  _description,
  homepage,
  author,
  repository,
  _licenseContent,
}: LicenseInfo) {
  const navigation = useNavigation();
  const licenseInfo = {
    libraryName,
    version,
    _license,
    _description,
    homepage,
    author,
    repository,
    _licenseContent,
  };

  const handleItemPress = () => {
    navigation.navigate('OpenSourceModal', {licenseInfo});
  };

  return (
    <Pressable onPress={handleItemPress}>
      <View style={styles.itemContainer}>
        <AppText style={styles.text} isEllipsizeMode={true}>
          {libraryName}
        </AppText>
        <AppIcon
          name="arrowRight"
          width={28}
          height={28}
          onPress={handleItemPress}
        />
      </View>
    </Pressable>
  );
}

export function OpenSourceList(): React.JSX.Element {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={openSourceLicense}
      keyExtractor={item => String(item.libraryName)}
      renderItem={({item}) => <License {...item} />}
      ItemSeparatorComponent={() => <AppDivider />}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  text: {
    width: '90%',
    fontWeight: font.fontWeight.medium,
  },
});
