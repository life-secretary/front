import React, { useState } from 'react';
import { View, StyleSheet, Image, Platform } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppModal from '@/components/common/modal/AppModal';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { getFontSize } from '@/utils/font';

import Survey from '../init/Survey';

type AgreementProps = {
    isVisible: boolean;
    closeModalHandler: () => void;
    closeStartProcess: () => void;
}

const Agreement = ({
    isVisible,
    closeModalHandler,
    closeStartProcess,
}: AgreementProps): React.JSX.Element => {

    const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

    const onPressAgreeAndStartButton = () => {
        setIsSurveyModalOpen(true);
    };

    const closeSurveyModal = () => {
        setIsSurveyModalOpen(false);
    };

    return (
        <AppModal
            isVisible={isVisible}
        > 
            <View style={styles.container}>
                <AppHeader>
                    <AppIcon
                        name='back'
                        width={42}
                        height={42}
                        onPress={closeModalHandler}
                    />
                </AppHeader>
                <View style={styles.logoContainer}>
                    <AppText style={styles.logoText}>살아가는데 필요한 정보</AppText>
                    <View style={styles.logoTextContainer}>
                        <AppIcon
                            name='logo'
                            width={80}
                            height={21}
                            styles={styles.logo}
                        />
                        <AppText style={styles.logoText}> 가 챙겨드릴게요</AppText>
                    </View>
                    <AppText style={styles.logoText}>어서오세요!</AppText>
                </View>
                <View>
                    <View style={{
                        position: 'absolute',
                        // zIndex: -1,
                    }}>
                        <Image 
                            source={require('@/assets/images/personalChecklist.png')}
                            style={styles.imageNote}
                        />
                    </View>
                    <View style={{
                        position: 'absolute',
                        // top: 180,
                        right: -30,
                        zIndex: -1
                    }}>
                        <Image 
                            source={require('@/assets/images/curiosityChild.png')}
                            style={styles.imagePerson}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}> 
                    <AppText style={styles.agreementText}>
                        만 14세 이상이고, 
                        <AppButton 
                            text='개인정보 처리방침과 이용약관'
                            textStyle={styles.agreementButtonText}
                        />
                        에 동의하시나요?
                    </AppText>
                    <AppButton 
                        text='동의하고 시작하기'
                        textStyle={styles.startButtonText}
                        buttonStyle={styles.startButton}
                        onPressButton={onPressAgreeAndStartButton}
                    />
                    <AppText style={styles.disagreementText}>
                        만 14세 미만이거나 이용약관에 
                        <AppButton 
                            text=' 비동의'
                            textStyle={styles.disagreementButtonText}
                        />
                        합니다.
                    </AppText>
                </View>
            </View>
            <Survey 
                isVisible={isSurveyModalOpen} 
                closeModalHandler={closeSurveyModal}
                closeStartProcess={closeStartProcess}
            />
        </AppModal>  
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 24,
    },

    logoContainer: {
        gap: 8,
        marginTop: 10,
    },  
    logo: {
        color: '#4681F6', 
        marginTop: 1
    },
    logoTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontWeight: '700',
        fontSize: getFontSize(24),
        lineHeight: 29,
        color: '#000E24'
    },
    
    imagePerson: {
        width: 320,
        height: 320,
    },
    imageNote: {
        width: 250,
        height: 250,
    },

    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        gap: 10,
        zIndex: 9,
        alignItems: 'center',
        paddingHorizontal: 24,
        // TODO 스타일 통일 (혼잡)
        ...Platform.select({
            android: {
                paddingHorizontal: 0,
                paddingLeft: 4,
            }
        })
    },

    agreementText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,

        fontWeight: '500',
        fontSize: 13,
        lineHeight: 16,
        color: '#000E24',

        textAlign: 'center',
    },
    agreementButtonText: {
        height: '100%',

        fontWeight: '500',
        fontSize: getFontSize(13),
        lineHeight: 16,
        color: '#000E24',
        textDecorationLine: 'underline',

        marginTop: 8, // TOTO 야매 해결
    },

    startButtonText: {
        fontWeight: '600',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: '#FFFFFF'
    },
    startButton: {
        paddingHorizontal: 106,
        paddingVertical: 16,
        borderRadius: 10,
        backgroundColor: '#0B2A4F'
    },

    disagreementText: {
        fontWeight: '500',
        fontSize: getFontSize(13),
        lineHeight: 16,
        color: '#40474F',
    },
    disagreementButtonText: {
        height: '100%',

        fontWeight: '500',
        fontSize: getFontSize(13),
        lineHeight: 16,
        color: '#40474F',
        textDecorationLine: 'underline',

        marginTop: 3, // TOTO 야매 해결
    },
})

export default Agreement;