import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppText } from '../common/AppText';
import { ScrollView } from 'react-native-gesture-handler';
import AppIcon from '../common/AppIcon';
import { getFontSize } from '@/utils/font';
import AppButton from '../common/AppButton';

const ToDoDetail = ({
    navigation,
    route,
}: any) => {
    const { id } = route.params;

    const onPressCloseIcon = () => {
        navigation.goBack();
    };

    const data = ['노후비용 계산하기', '2', '3', '4', '5', '6', '7', '8', '9'];

    return (
        <View style={styles.background}>
            <View style={styles.content}>
                <View style={styles.titleWrapper}>
                    <View style={styles.closeIconWrapper}>
                        <AppIcon name='closeFillDark' width={42} height={42} onPress={onPressCloseIcon} style={styles.closeIconWrapper}/>
                    </View>
                    <View style={styles.titleTextWrapper}>
                        <AppText style={styles.categoryIcon}>
                            경제
                        </AppText>
                        <AppText style={styles.title}>
                            나의 미래준비, 어떻게 시작할까요?
                        </AppText>
                    </View>
                </View>
                <View style={styles.contentWrapper}>
                    <AppText style={styles.infoText}>아래 순서로 할 일을 진행해보세요</AppText>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.todoWrapper}>
                            {data.map((item) => {
                                return (
                                <AppText style={styles.todo}>{item}</AppText>
                                )   
                            })}
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <AppButton text='할 일 추가하기' 
                        textStyle={styles.buttonTextStyle} 
                        buttonStyle={styles.buttonStyle} 
                        endIcon={{
                            name: 'addLight',
                            styles: { color: '#FFFFFF' },
                            width: 36,
                            height: 36,
                        }} 
                    />
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    background: {
        height: '100%',
        backgroundColor: 'rgba(17, 17, 17, 0.4)',
    },
    content: {
        width: '100%',
        height: '90%',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: '#FFFFFF'
    },
    titleWrapper: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        backgroundColor: '#F2F4F7'
    },
    closeIconWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    categoryIcon: {
        alignSelf: 'flex-start',

        fontWeight: '600',
        fontSize: getFontSize(12),
        lineHeight: 15,
        color: '#4681F6',

        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginBottom: 11,
        backgroundColor: '#E7EDF3',
    },
    titleTextWrapper: {
        paddingHorizontal: 24,
        paddingBottom: 20,
    },
    title: {
        color: '#000E24',
        fontSize: getFontSize(22),
        fontWeight: '600',
    },
    contentWrapper: {
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    infoText: {
        color: '#A1ACB9',
        fontSize: 12,
        marginBottom: 12,
    },
    scrollView: {
        height: 330,
    },
    todoWrapper: {
        gap: 20,
    },
    todo: {
        color: '#40474F',
        fontSize: getFontSize(16),
        fontWeight: '600',
        width: '100%',
        borderColor: '#E7EDF3',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 28,
        paddingVertical: 23,
    },
    buttonContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 20,
    },
    buttonWrapper: {
        position: 'relative',
        paddingHorizontal: 120, // 임시
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        fontSize: getFontSize(13),
        fontWeight: '500',
        textAlign: 'center'
    },
    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        paddingLeft: 20,
        paddingRight: 10,
        paddingVertical: 5,
        backgroundColor: '#000E24',
    },
})

export default ToDoDetail;