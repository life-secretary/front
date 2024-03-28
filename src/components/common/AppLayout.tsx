import * as React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import spacing from '../../styles/spacing';

export function AppLayout({children, style}: any): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <StatusBar barStyle="default" />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.layoutPaddingHorizontal,
  },
});
