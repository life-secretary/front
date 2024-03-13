import React from 'react';
import { View, StyleSheet } from 'react-native';

import type { AppModalProps } from './AppModal';
import type { ButtonProps } from '../AppButton';

import AppModal from './AppModal';
import AppButton from '../AppButton';
import { AppText } from '../AppText';
import { getFontSize } from '../../../utils/font';

export type AppConfirmModal = Partial<AppModalProps> & {
    /** [Required] button flex direction type */
    type: 'row' | 'column';

    /** [Required] ConfirmModal title */
    title: string,

    /** [Required] ConfirmModal description */
    description: string,

    /** [Required] ConfirmModal button properties */
    button: {
        first: ButtonProps,
        second?: ButtonProps,
    }
}

const AppConfirmModal = ({
    isVisible=true,
    type='column',
    title='',
    description='',
    button={
        first: {
            text: '',
            textStyle: {},
            buttonStyle: {},
            onPressButton: () => {},
        },
        second: {
            text: '',
            textStyle: {},
            buttonStyle: {},
            onPressButton: () => {},
        },
    },
}): React.JSX.Element => {

    const constants = {
        MODAL_CONFIRM_BACKDROP_COLOR: '#111111',
        MODAL_CONFIRM_BACKDROP_OPACITY: 0.4,
    };

    return (
        <AppModal
            isVisible={isVisible}
            backdropColor={constants.MODAL_CONFIRM_BACKDROP_COLOR}
            backdropOpacity={constants.MODAL_CONFIRM_BACKDROP_OPACITY}
        >
            <View style={styles.modalContainer}>
                <View style={styles.textWrapper}>
                    <AppText style={styles.title}>{title}</AppText>
                    <AppText style={styles.description}>{description}</AppText>
                </View>
                <View style={type === 'row' ? styles.buttonRowWrapper : styles.buttonColumnWrapper}>
                    <AppButton
                        text={button.first.text}
                        textStyle={button.first.textStyle}
                        buttonStyle={button.first.buttonStyle}
                        onPressButton={button.first.onPressButton}
                    />
                    {
                        button.second ? 
                        <AppButton
                            text={button.second.text}
                            textStyle={button.second.textStyle}
                            buttonStyle={button.second.buttonStyle}
                            onPressButton={button.second.onPressButton}
                        />
                        :
                        null
                    }
                </View>
            </View>
        </AppModal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',

        width: 287,
        gap: 26,
        
        paddingTop: 38,
        paddingHorizontal: 18,
        paddingBottom: 20,

        borderRadius: 20,
        backgroundColor: '#FFFFFF'
    },

    textWrapper: {
        width: '100%',
        gap: 10,
    },

    title: {
        alignSelf: 'center',
        fontWeight: '600',
        fontSize: getFontSize(20),
        lineHeight: 24,
        color: '#000E24'
    },

    description: {
        alignSelf: 'center',
        fontWeight: '500',
        fontSize: getFontSize(15),
        lineHeight: 18,
        color: '#526070'
    },

    buttonColumnWrapper: {
        width: '100%',
        gap: 4,
    },
    buttonRowWrapper: {
        flexDirection: 'row',
        width: '100%',
        gap: 12,
    }
})

export default AppConfirmModal;