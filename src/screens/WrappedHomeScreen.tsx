import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {AppErrorFallback} from '@/components/common/AppErrorFallback';
import {HomeScreen} from './HomeScreen';

const WrappedHomeScreen = ({navigation}: any) => (
  <ErrorBoundary FallbackComponent={AppErrorFallback}>
    <HomeScreen navigation={navigation} />
  </ErrorBoundary>
);

export default WrappedHomeScreen;
