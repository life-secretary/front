import * as React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import spacing from '../../styles/spacing';
import color from '@/styles/color';

export function AppLayout({
  children,
  style,
  isUsedPadding = true,
}: any): React.JSX.Element {
  return (
    <SafeAreaView
      style={[styles.layout, style, isUsedPadding && styles.padding]}>
      <StatusBar barStyle="default" />
      {children}
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
});
