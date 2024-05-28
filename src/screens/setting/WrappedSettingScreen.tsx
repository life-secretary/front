import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {AppErrorFallback} from '@/components/common/AppErrorFallback';
import {SettingScreen} from './SettingScreen';

const WrappedSettingScreen = ({navigation}: any) => (
  <ErrorBoundary FallbackComponent={AppErrorFallback}>
    <SettingScreen navigation={navigation} />
  </ErrorBoundary>
);

export default WrappedSettingScreen;
