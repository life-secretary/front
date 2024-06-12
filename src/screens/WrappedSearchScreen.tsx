import React from 'react';
import ErrorBoundary from 'react-native-error-boundary';
import { AppErrorFallback } from '@/components/common/AppErrorFallback';
import SearchScreen from './search/SearchScreen';

const WrappedSearchScreen = ({
    navigation
}: any) => {
    return (
        <ErrorBoundary FallbackComponent={AppErrorFallback}>
            <SearchScreen navigation={navigation} />
        </ErrorBoundary>
    );
};

export default WrappedSearchScreen;