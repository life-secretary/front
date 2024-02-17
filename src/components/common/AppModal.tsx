import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Modal from 'react-native-modal';
import type { ModalProps } from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';


type AppModalProps = Partial<ModalProps> & {
    /* [Required] Show the modal */
    isVisible: boolean,
    
    /* The backdrop background color */
    backdropColor: string,

    /* The backdrop opacity when the modal is visible */
    backdropOpacity: number,
};

const AppModal = ({ 
    children, 
    isVisible, 
    backdropColor, 
    backdropOpacity 
}: AppModalProps): React.JSX.Element => {

    const { width, height } = useWindowDimensions();

    return (
        <Modal 
            isVisible={isVisible}
            deviceWidth={width}
            deviceHeight={height}
            backdropColor={backdropColor}
            backdropOpacity={backdropOpacity}
            onModalShow={() => {}} // Modal 이 완전히 띄워졌을 때 실행되는 callback 함수 (props로 전달)
        >
            <SafeAreaView style={styles.modalContainer}>
                {children} 
            </SafeAreaView>
        </Modal>
    );  
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 28
    },
})

export default AppModal;