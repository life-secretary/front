import React from 'react';
import AppModal from './AppModal';
import { View, Text } from 'react-native';

const AppConfirmModal = () => {

    const constants = {
        MODAL_CONFIRM_BACKDROP_COLOR: '#111111',
        MODAL_CONFIRM_BACKDROP_OPACITY: 0.4,
    };

    return (
        <AppModal
            isVisible={true}
            backdropColor={constants.MODAL_CONFIRM_BACKDROP_COLOR}
            backdropOpacity={constants.MODAL_CONFIRM_BACKDROP_OPACITY}
        >
            <View style={{
                alignItems: 'center',

                width: 287,
                borderRadius: 20,
                backgroundColor: '#FFFFFF'
            }}>
                <Text>
                    Hello World
                </Text>
            </View>
        </AppModal>
    );
}

export default AppConfirmModal;