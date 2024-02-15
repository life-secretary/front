import React from 'react';
import { Modal, StyleSheet } from 'react-native';
import type { ModalProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


type AppModalProps = Partial<ModalProps> & {
    /** State that determines whether to display(open) the modal or not */
    isVisible: boolean,    
};

const AppModal = ({ children, isVisible }: AppModalProps): React.JSX.Element => {

    return (
        <Modal 
            animationType='slide' 
            visible={isVisible}
            onShow={() => {}} // Modal 띄울시 실행되는 callback 함수 (props로 전달)
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