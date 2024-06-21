import React from 'react';

import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {AppText} from './AppText';
import AppIcon from './AppIcon';
import spacing from '@/styles/spacing';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFontSize} from '@/utils/font';

export function AppLayout({
  children,
  style,
  isPaddingUsed = false,
}: any): React.JSX.Element {
  const toastWidth =
    Dimensions.get('window').width - spacing.layoutPaddingHorizontal * 2;

  const toastConfig = {
    success: ({ props }: any) => (
      <View style={[styles.toast, {width: toastWidth}, props.style ? props.style : {}]}>
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
    error: ({ props }: any) => (
      <View style={[styles.toast, {width: toastWidth}, props.style ? props.style : {}]}>
        <View style={styles.iconContainer}>
          <AppIcon
            name="closeFillDark"
            width={24}
            height={24}
            styles={{fill: '#E44848', stroke: color.main.white}}
          />
        </View>
        <AppText style={styles.toastText}>{props?.text}</AppText>
      </View>
    ),
  };

  return (
    <SafeAreaView
      style={[styles.layout, style, isPaddingUsed && styles.padding]}>
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
    marginBottom: 85, // bottom tab height
    gap: 6,
    borderRadius: 10,
    backgroundColor: '#000E24B2',
  },
  toastText: {
    fontSize: getFontSize(14),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 16.71,
    color: color.main.white,
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
});
