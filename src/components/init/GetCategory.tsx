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

import { styles } from '../../screens/init/Survey';
import type { SurveyProccessProps } from '../../screens/init/Survey';

const GetCategory = ({
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [containerWidth, setContainerWidth] = useState(0);
    const [data, setData] = useState([
        { name: '경제', id: '', selected: true },
        { name: '법', id: '', selected: false },
        { name: '금융', id: '', selected: false },
        { name: '세금', id: '', selected: false },
        { name: '부동산', id: '', selected: false },
        { name: '건강', id: '', selected: false },
        { name: '환경', id: '', selected: false },
        { name: '문화', id: '', selected: false },
        { name: '자기 계발', id: '', selected: false },
        { name: '여행', id: '', selected: false },
        { name: '모두 해당', id: '', selected: false },
    ]);

    const margins = 12;
    const numColumns = 2;

    const onPressCategoryButton = (index: number) => {
        setData((previousValue) => {
            const newValue = previousValue.map((item, idx, array) => {
                if (index === array.length - 1) {
                    if (array[array.length - 1].selected === false) {
                        return { ...item, selected: true }; 
                    } else {
                        return { ...item, selected: false }; 
                    }
                }

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
        if (userInfo) {
            setData((previousValue) => {
                const newData = previousValue.map((item) => {
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
        }
    }, []);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.headerContainer}>
                <AppIcon
                    name='back'
                    width={42}
                    height={42}
                    onPress={backButtonHandler}
                />
            </AppHeader>
            <View>
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
                            text={item.name}
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
                    onPressButton={!checkCategorySelect() ? () => {} : () => nextButtonHandler(data)}
                />
            </View>
        </View>
    );
};

export default GetCategory;