import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useQueries } from '@tanstack/react-query';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { useSetRecoilState } from 'recoil';
import { getFontSize } from '@/utils/font';
import { fetchData } from '@/api/api';
import { categoryListState } from '@/store/categoryState';
import { occupationListState } from '@/store/occupation';

const Agreement = ({
    navigation
}: any) => {
    const setCategoryList = useSetRecoilState(categoryListState);
    const setOccupationList = useSetRecoilState(occupationListState);

    const fetchCategories = async () => {
        const res = await fetchData('/categories', null);
        return res.data.data;
    };

    const fetchOccupations = async () => {
        const res = await fetchData('/occupation', {});
        return res.data.data;
    };

    const handleButtonPress = (title, name) => {
        navigation.navigate('SettingModal', {
            headerTitle: title,
            menu: {key: name}
        });
    };

    const combinedQueries = useQueries({
        queries: [
          {
            queryKey: ['categories'],
            queryFn: fetchCategories,
          },
          {
            queryKey: ['occupations'],
            queryFn: fetchOccupations,
          },
        ],
        combine: results => {
          return {
            data: results.map(result => result.data),
            isLoading: results.some(result => result.isLoading),
            error: results.some(result => result.error),
          };
        },
    });

    const {data, error, isLoading} = combinedQueries;

    useEffect(() => {
        if (error && !isLoading) {
            throw error;
        }

        const [ categories, occupations ] = data;

        if (categories) {
            setCategoryList(categories);
        }

        if (occupations) {
            setOccupationList(occupations);
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.header}>
                <AppIcon 
                    name='back'
                    width={42}
                    height={42}
                    onPress={() => navigation.goBack()}
                />
            </AppHeader>
            <View style={styles.titleContainer}>
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
                    top: 30,
                    left: -10,
                }}>
                    <Image 
                        source={require('@/assets/gif/personal_goals_checklist.gif')}
                        style={styles.imageNote}
                    />
                </View>
                <View style={{
                    position: 'absolute',
                    top: 70,
                    right: -55,
                    zIndex: 1,
                }}>
                    <Image 
                        source={require('@/assets/gif/curiosity_child.gif')}
                        style={styles.imagePerson}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <AppText style={styles.agreementText}>
                    만 14세 이상이고, 
                    <AppButton 
                        text=' 개인정보 처리방침'
                        textStyle={styles.agreementButtonText}
                        onPressButton={() => handleButtonPress('개인정보 처리방침', 'privacy')}
                    />
                    과
                    <AppButton 
                        text=' 이용약관'
                        textStyle={styles.agreementButtonText}
                        onPressButton={() => handleButtonPress('이용약관', 'service')}
                    />
                    에 동의하시나요?
                </AppText>
                <AppButton 
                    text='동의하고 시작하기'
                    textStyle={styles.startButtonText}
                    buttonStyle={styles.startButton}
                    onPressButton={() => navigation.navigate('GetNickName')}
                />
                <AppText style={styles.disagreementText}>
                    만 14세 미만이거나 이용약관에 
                    <AppButton 
                        text=' 비동의'
                        textStyle={styles.disagreementButtonText}
                        onPressButton={() => navigation.navigate('Login')}
                    />
                    합니다.
                </AppText>
            </View>
        </View>
    )
};

export default Agreement;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#FFFFFF',
    },
    header: {
        marginTop: 55,
        left: -10,
    },

    titleContainer: {
        gap: 8,
        marginTop: 30,
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
        width: '100%',
        position: 'absolute',
        left: 24,
        bottom: 30,
        gap: 10,
    },

    agreementText: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,

        fontWeight: '500',
        fontSize: getFontSize(13),
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

        marginTop: 8, // NOTE 야매 해결
    },

    startButtonText: {
        fontWeight: '600',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: '#FFFFFF',
        textAlign: 'center',
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
        textAlign: 'center',
    },
    disagreementButtonText: {
        height: '100%',

        fontWeight: '500',
        fontSize: getFontSize(13),
        lineHeight: 16,
        color: '#40474F',
        textDecorationLine: 'underline',

        marginTop: 3, // NOTE 야매 해결
    },
})