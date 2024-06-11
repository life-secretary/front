import React, { useEffect, useState } from 'react';
import { 
    View, 
    FlatList,
} from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { useRecoilState, useRecoilValue } from 'recoil';
import { surveyCategoryListState } from '@/store/categoryState';
import { userInfoState } from '@/store/login';

import { styles } from '@/styles/survey';

const GetCategory = ({
    navigation
}: any) => {
    const categoryList = useRecoilValue(surveyCategoryListState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [containerWidth, setContainerWidth] = useState(0);
    const [data, setData] = useState(categoryList);

    const margins = 12;
    const numColumns = 2;

    const onPressCategoryButton = (index: number) => {
        setData((previousValue) => {
            const newValue = previousValue.map((item, idx, array) => {
                if (idx === index) {
                    item.selected = !item.selected;
                }

                return item;
            });

            setUserInfo((previousValue) => {
                const interests = newValue
                    .filter((item) => item.selected)
                    .map((item) => item.id);
                    
                return {
                    ...previousValue,
                    interests,
                };
            })

            return newValue;
        });
    };

    const checkCategorySelect = () => {
        return data.reduce((prev, curr) => {
            return prev || curr.selected;
        }, false);
    };

    useEffect(() => {
        setData((previousValue) => {
            const newData = categoryList.map((item) => {
                return {...item, selected: false};
            });

            userInfo.interests.forEach((id) => {
                const item = newData.find((category) => category.id === id);
                
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
                    onPress={() => navigation.navigate('GetGender')}
                />
            </AppHeader>
            <View style={styles.titleContainer}>
                <View style={styles.textContainer}>
                    <AppText style={styles.titleText}>알고 싶은 분야를 선택해 주세요</AppText>
                    <AppText style={styles.subTitleText}>관심사 기반으로 정보를 볼 수 있어요 (최소 1개 이상)</AppText>
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
                            onPressButton={() => onPressCategoryButton(index)}
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
                    buttonStyle={[styles.nextButton, !checkCategorySelect() ? styles.nextButtonDisabled : {}]}
                    onPressButton={!checkCategorySelect() ? () => {} : () => navigation.navigate('GetOccupation')}
                />
            </View>
        </View>
    );
};

export default GetCategory;