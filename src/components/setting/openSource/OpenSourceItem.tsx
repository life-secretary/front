import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {AppText} from '@/components/common/AppText';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

import {getFontSize} from '@/utils/font';
import color from '@/styles/color';

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

export function OpenSourceItem({
  libraryName,
  version,
  homepage,
  _licenseContent,
}: LicenseInfo): React.JSX.Element {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <AppText style={styles.title}>{libraryName}</AppText>
      <View style={styles.textContainer}>
        <AppText style={styles.text}>v. {version}</AppText>
        <AppText style={styles.text}>{homepage}</AppText>
      </View>
      <View style={styles.contentContainer}>
        <AppText>{_licenseContent}</AppText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: spacing.layoutPaddingHorizontal,
  },
  title: {
    fontSize: getFontSize(20),
    fontWeight: font.fontWeight.semiBold,
  },
  textContainer: {
    paddingVertical: 10,
  },
  text: {
    fontSize: getFontSize(14),
  },
  contentContainer: {
    paddingVertical: 20,
  },
});
