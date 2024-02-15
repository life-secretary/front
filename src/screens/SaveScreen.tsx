import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {AppText} from '../components/common/AppText';

export function SaveScreen(): React.JSX.Element {
  return (
    <AppLayout>
      <AppHeader />
      <View style={styles.container}>
        <AppText style={styles.text}>Save Screen</AppText>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: '300',
  },
});
