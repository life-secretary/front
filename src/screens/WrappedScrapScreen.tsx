import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {AppErrorFallback} from '@/components/common/AppErrorFallback';
import {ScrapScreen} from './ScrapScreen';

const WrappedScrapScreen = ({navigation}: any) => (
  <ErrorBoundary FallbackComponent={AppErrorFallback}>
    <ScrapScreen navigation={navigation} />
  </ErrorBoundary>
);

export default WrappedScrapScreen;
