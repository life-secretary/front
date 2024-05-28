import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import {AppErrorFallback} from '@/components/common/AppErrorFallback';
import {TodoScreen} from './TodoScreen';

const WrappedTodoScreen = ({navigation}: any) => (
  <ErrorBoundary FallbackComponent={AppErrorFallback}>
    <TodoScreen navigation={navigation} />
  </ErrorBoundary>
);

export default WrappedTodoScreen;
