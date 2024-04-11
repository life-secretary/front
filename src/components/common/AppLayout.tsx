import React from 'react';

import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import spacing from '@/styles/spacing';
import color from '@/styles/color';
import {font} from '@/styles/font';
import {AppText} from './AppText';
import AppIcon from './AppIcon';

export function AppLayout({
  children,
  style,
  isUsedPadding = true,
}: any): React.JSX.Element {
  const toastWidth =
    Dimensions.get('window').width - spacing.layoutPaddingHorizontal * 2;

  const toastConfig = {
    success: ({props}: object) => (
      <View style={[styles.toast, {width: toastWidth}]}>
        <View style={styles.iconContainer}>
          <AppIcon
            name="checkBoxCircle"
            width={24}
            height={24}
            styles={{fill: color.main.secondary, stroke: color.main.white}}
          />
        </View>
        <AppText style={styles.toastText}>{props?.text}</AppText>
      </View>
    ),
  };

  return (
    <SafeAreaView
      style={[styles.layout, style, isUsedPadding && styles.padding]}>
      <StatusBar barStyle="default" />
      {children}
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: color.main.white,
  },
  padding: {
    paddingHorizontal: spacing.layoutPaddingHorizontal,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
    borderRadius: 10,
    backgroundColor: '#000E24B2',
  },
  toastText: {
    fontSize: 14,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 16.71,
    color: color.main.white,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
});
