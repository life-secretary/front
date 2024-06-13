import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '@/store/login';
import { surveyOccupationListState } from '@/store/occupation';

import { styles } from '@/styles/survey';

const GetOccupation = ({
    navigation
}: any) => {
    const occupationList = useRecoilValue(surveyOccupationListState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [containerWidth, setContainerWidth] = useState(0);
    const [data, setData] = useState(occupationList);

    const margins = 12;
    const numColumns = 2;

    const onPressOccupationButton = (index: number) => {
        setData((previousValue) => {
            const newValue = previousValue.map((item, idx, array) => {
                const lastOneSelected = array[array.length - 1].selected
                if (index === array.length - 1) {
                    if (!lastOneSelected) {
                        return { ...item, selected: idx === array.length - 1 }
                    }
                }

                if (idx === index) {
                    item.selected = !item.selected;
                    if (lastOneSelected) {
                        array[array.length - 1].selected = false
                    }
                }

                return item;
            });

            setUserInfo((previousValue) => {
                const jobIds = newValue
                .filter((item) => item.selected)
                .map((item) => item.id);

                return {
                    ...previousValue,
                    jobIds,
                }
            });

            return newValue;
        });
    };

    const checkOccupationSelect = () => {
        return data.reduce((prev, curr) => {
            return prev || curr.selected;
        }, false);
    };

    useEffect(() => {
        setData((previousValue) => {
            const newData = occupationList.map((item) => {
                return {...item, selected: false};
            });

            userInfo.jobIds.forEach((id) => {
                const item = newData.find((jobData) => jobData.id === id);
                
                if (item) {
                    item.selected = true;
                }
            });

            return newData;
        });
    }, []);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.headerContainer}>
                <AppIcon
                    name='back'
                    width={42}
                    height={42}
                    onPress={() => navigation.navigate('GetCategory', { modify: false })}
                />
                <AppButton 
                    text='건너뛰기'
                    textStyle={styles.passButtonText}
                    onPressButton={() => navigation.navigate('Welcome')}
                />
            </AppHeader>
            <View style={styles.titleContainer}>
                <View style={styles.textContainer}>
                    <AppText style={styles.titleText}>직업군을 선택해 주세요</AppText>
                    <AppText style={styles.subTitleText}>직업별로 유용한 정보를 알려드려요 (중복가능)</AppText>
                </View>
            </View>
            <FlatList 
                data={data}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 12,
                  }}
                onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
                renderItem={({item, index}) => {
                    return (
                        <AppButton 
                            text={item.title}
                            textStyle={item.selected ? styles.buttonSelectedText : styles.buttonUnselectedText}
                            buttonStyle={[
                                {
                                    width: (containerWidth - margins) / numColumns,
                                },
                                item.selected ? styles.buttonSelected : styles.buttonUnselected
                            ]}
                            onPressButton={() => onPressOccupationButton(index)}
                        />
                    );
                }}
                keyExtractor={(item, index) => String(index)}
                numColumns={numColumns}
            />
            <View style={styles.buttonContainer}>
                <AppButton 
                    text='다음'
                    textStyle={styles.nextButtonText}
                    buttonStyle={[styles.nextButton, !checkOccupationSelect() ? styles.nextButtonDisabled : {}]}
                    onPressButton={!checkOccupationSelect() ? () => {} : () => navigation.navigate('GetMarriage')}
                />
            </View>
        </View>
    );
}

export default GetOccupation;