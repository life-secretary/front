import React, { useEffect, useState } from 'react';
import { 
    View, 
    FlatList,
} from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { useRecoilState } from 'recoil';
import { userInfoState } from '@/store/login';

import { styles } from '@/styles/survey';

const GetGender = ({
    navigation
}: any) => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [containerWidth, setContainerWidth] = useState(0);
    const [data, setData] = useState([
        { name: '선택안함', id: '', selected: true },
        { name: '남성', id: 'M', selected: false },
        { name: '여성', id: 'F', selected: false },
    ]);

    const margins = 25;
    const numColumns = 3;

    const onPressGenderButton = (index: number) => { 
        setData((previousValue) => {
            const newValue = previousValue.map((item, idx) => {
                item.selected = index === idx;
                return item;
            });

            setUserInfo((previousValue) => {
                const gender = newValue.find((item) => item.selected);
                return {
                    ...previousValue,
                    gender: gender ? gender.id : '',
                };
            });
            return newValue;
        });
    };

    useEffect(() => {
        setData((previousValue) => {
            return previousValue.map((item) => {
                if (item.id === userInfo.gender) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }

                return item;
            });
        });
    }, []);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.headerContainer}>
                <AppIcon
                    name='back'
                    width={42}
                    height={42}
                    onPress={() => navigation.navigate('GetBirthDate')}
                />
            </AppHeader>
            <View style={styles.titleContainer}>
                <View style={styles.textContainer}>
                    <AppText style={styles.titleText}>성별을 선택해 주세요</AppText>
                    <AppText style={styles.subTitleText}>관리 페이지에서 언제든지 변경할 수 있어요</AppText>
                </View>
            </View>
            <FlatList 
                data={data}
                columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginBottom: 32,
                  }}
                onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
                renderItem={({item, index}) => {
                    return (
                        <AppButton 
                            text={item.name}
                            textStyle={item.selected ? styles.buttonSelectedText : styles.buttonUnselectedText}
                            buttonStyle={[
                                {
                                    width: (containerWidth - margins) / numColumns,
                                },
                                item.selected ? styles.buttonSelected : styles.buttonUnselected
                            ]}
                            onPressButton={() => onPressGenderButton(index)}
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
                    buttonStyle={styles.nextButton}
                    onPressButton={() => navigation.navigate('GetCategory')}
                />
            </View>
        </View>
    );
}

export default GetGender;