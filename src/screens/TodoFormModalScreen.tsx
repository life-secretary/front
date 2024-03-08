import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {AppText} from '../components/common/AppText';
import {AppHeader} from '../components/common/AppHeader';
import {AppLayout} from '../components/common/AppLayout';

export function TodoFormModalScreen({route, navigation}: any) {
  const {headerTitle, form} = route.params;

  return (
    <AppLayout>
      <AppHeader style={styles.header}>
        <View style={styles.titleContainer}>
          <AppText style={styles.headerTitle}>{headerTitle}</AppText>
        </View>
        <Pressable
          style={styles.buttonContainer}
          onPress={() => {
            navigation.goBack();
          }}>
          <AppText style={styles.backButton}>X</AppText>
        </Pressable>
      </AppHeader>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {form}
      </KeyboardAvoidingView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000E24',
  },
  container: {
    flex: 1,
  },
  titleContainer: {},
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    fontWeight: '700',
  },
});
