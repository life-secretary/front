import React, { ChangeEvent, Component, useEffect, useState, useRef } from 'react';
import { 
    View, 
    StyleSheet, 
    TextInput,
    KeyboardAvoidingView,
    Platform,
    FlatList,
    Image,
} from 'react-native';

import { AppText } from '@/components/common/AppText';
import { AppHeader } from '@/components/common/AppHeader';
import AppModal from '@/components/common/modal/AppModal';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import { getFontSize } from '@/utils/font';

type SurveyProccessProps = {
    userInfo?: {
        nickName: string;
        year: string;
        month: string;
        day: string;
        gender: string;
        categories: string[];
        occupations: string[];
        hasMarriage: boolean;
        hasChildren: boolean;
    };
    backButtonHandler: () => void;
    nextButtonHandler: Function;
    closeStartProcess?: () => void;
}

const GetNickName = ({
    userInfo,
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
    const [nickName, setNickName] = useState('');
    const [isError, setIsError] = useState(true)

    const onChangeTextInput = ({ nativeEvent }: any) => {
        const checkHasSpecialText = new RegExp(/[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/ ]/, 'gim');

        const { text } = nativeEvent;

        if (
            text.match(checkHasSpecialText) !== null ||
            text.length > 6 || text.length === 0
        ) {
            setIsError(true);
        } else {
            setIsError(false);
        }

        setNickName(text);
    };

    useEffect(() => {
        if (userInfo) {
            setNickName(userInfo.nickName);
            setIsError(false);
        }
    }, [userInfo]);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyBoardAvoidingContainer}
        >
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
                        <AppText style={styles.titleText}>닉네임을 알려주세요</AppText>
                        <AppText style={styles.subTitleText}>공백없이 6자 내로 입력할 수 있어요 (특수문자 불가)</AppText>
                    </View>
                </View>
                <TextInput
                    value={nickName}
                    onChange={onChangeTextInput}
                    style={[styles.textInput, isError ? styles.textInputError : {}]}
                    autoFocus={true}
                />
                <View style={styles.buttonContainer}>
                    <AppButton 
                        text='다음'
                        textStyle={styles.nextButtonText}
                        buttonStyle={[styles.nextButton, isError ? styles.nextButtonDisabled : {}]}
                        disabled={isError}
                        onPressButton={isError ? () => {} : () => nextButtonHandler(nickName)}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
};

const GetBirthDate = ({
    userInfo,
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
    const currentDate = new Date();
    const yearRef = useRef(null);
    const monthRef = useRef(null);
    const dayRef = useRef(null);

    const [year, setYear] = useState(''); 
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [isError, setIsError] = useState(true);

    const onChangeYearText = ({ nativeEvent }: any) => {
        const { text } = nativeEvent;
        const currentYear = currentDate.getFullYear();

        if (((text.length === 4) && (Number(text) >= Number(currentYear))) ||
            ((text.length === 4) && (Number(text) <= Number(currentYear) - 150)) ||
            (0 < text.length && text.length < 4)
        ) {
            setIsError(true);
        } else {
            setIsError(false);

            if (text.length === 4 && monthRef.current) {
                monthRef.current.focus();
            }
        }

        setYear(text.slice(0, 4));
    };

    const onChangeMonthText = ({ nativeEvent }: any) => {
        const { text } = nativeEvent;

        if (((text.length === 2) && (text[0] > 1)) ||
            (0 < text.length && text.length < 2)
        ) {
            setIsError(true);
        } else {
            setIsError(false);

            if (text.length === 2 && dayRef.current) {
                dayRef.current.focus();
            }
        }

        if (text.length === 0 && yearRef.current) {
            yearRef.current.focus();
        }

        if (text[0] > 1) {
            setMonth(('0' + text).slice(0, 2));
        } else {
            setMonth(text.slice(0, 2));
        }
    };

    const onChangeDayText = ({ nativeEvent }: any) => {
        const { text } = nativeEvent;

        if (((text.length === 2) && (text[0] > 3)) ||
        (0 < text.length && text.length < 2)
        ) {
            setIsError(true);
        } else {
            setIsError(false);
        }

        if (text.length === 0 && monthRef.current) {
            monthRef.current.focus();
        }

        setDay(text.slice(0, 2));
    };

    const allTextInputFull = () => {
        return !!year.length && !!month.length && !!day.length;
    };

    // NOTE 왜 업데이트가 안되지..?
    useEffect(() => {
        if (userInfo) {
            setYear(userInfo.year);
            setMonth(userInfo.month);
            setDay(userInfo.day);
            setIsError(false);
        }
    }, [userInfo]);

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyBoardAvoidingContainer}
        >
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
                        <AppText style={styles.titleText}>생년월일을 입력해 주세요</AppText>
                        <AppText style={styles.subTitleText}>나이에 맞는 정보를 제공해드리기 위해 필요해요</AppText>
                    </View>
                </View>
                <View style={[styles.textInputBirth, isError ? styles.textInputError : {}]}>
                    <TextInput
                        ref={yearRef}
                        keyboardType='numeric'
                        placeholder='0000'
                        value={year}
                        onChange={onChangeYearText}
                        style={styles.textBirth}
                        autoFocus={true}
                    />
                    <AppText style={styles.textBirth}>년 </AppText>
                    <TextInput
                        ref={monthRef}
                        keyboardType='numeric'
                        placeholder='00'
                        value={month}
                        onChange={onChangeMonthText}
                        style={styles.textBirth}
                    />
                    <AppText style={styles.textBirth}>월 </AppText>
                    <TextInput
                        ref={dayRef}
                        keyboardType='numeric'
                        placeholder='00'
                        value={day}
                        onChange={onChangeDayText}
                        style={styles.textBirth}
                    />
                    <AppText style={styles.textBirth}>일 </AppText>
                </View>
                <View style={styles.buttonContainer}>
                    <AppButton 
                        text='다음'
                        textStyle={styles.nextButtonText}
                        buttonStyle={[styles.nextButton, (isError || !allTextInputFull()) ? styles.nextButtonDisabled : {}]}
                        onPressButton={(isError || !allTextInputFull()) ? () => {} : () => nextButtonHandler({year, month, day})}
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const GetGender = ({
    userInfo,
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
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
            return previousValue.map((item, idx) => {
                if (index === idx) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }

                return item;
            })
        });
    };

    useEffect(() => {
        if (userInfo) {
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
        }
    }, [userInfo]);

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
                    onPressButton={() => nextButtonHandler(data)}
                />
            </View>
        </View>
    );
};

const GetCategory = ({
    userInfo,
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
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
            return previousValue.map((item, idx, array) => {
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

                userInfo.categories.forEach((id) => {
                    const item = newData.find((category) => category.id === id);
                    
                    if (item) {
                        item.selected = true;
                    }
                });

                return newData;
            });
        }
    }, [userInfo]);

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

const GetOccupation = ({
    userInfo,
    backButtonHandler,
    nextButtonHandler,
    closeStartProcess,
}: SurveyProccessProps): React.JSX.Element => {
    const [containerWidth, setContainerWidth] = useState(0);
    const [data, setData] = useState([
        { name: '학생', id: '', selected: true },
        { name: '직장인', id: '', selected: false },
        { name: '개인 사업', id: '', selected: false },
        { name: '취업 준비생', id: '', selected: false },
        { name: '군인', id: '', selected: false },
        { name: '프리랜서', id: '', selected: false },
        { name: '해당 없음', id: '', selected: false },
    ]);

    const margins = 12;
    const numColumns = 2;

    const onPressOccupationButton = (index: number) => {
        setData((previousValue) => {
            return previousValue.map((item, idx, array) => {
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
        });
    };

    const checkOccupationSelect = () => {
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

                userInfo.categories.forEach((id) => {
                    const item = newData.find((category) => category.id === id);
                    
                    if (item) {
                        item.selected = true;
                    }
                });

                return newData;
            });
        }
    }, [userInfo]);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.headerContainer}>
                <AppIcon
                    name='back'
                    width={42}
                    height={42}
                    onPress={backButtonHandler}
                />
                <AppButton 
                    text='건너뛰기'
                    textStyle={styles.passButtonText}
                    onPressButton={closeStartProcess}
                />
            </AppHeader>
            <View>
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
                            text={item.name}
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
                    onPressButton={!checkOccupationSelect() ? () => {} : () => nextButtonHandler(data)}
                />
            </View>
        </View>
    );
};

const GetMarriage = ({
    userInfo,
    backButtonHandler,
    nextButtonHandler,
    closeStartProcess,
}: SurveyProccessProps): React.JSX.Element => {
    const [containerWidth, setContainerWidth] = useState(0);
    const [dataMarriage, setDataMarriage] = useState([
        { name: '미혼', id: false, selected: true },
        { name: '기혼', id: true, selected: false },
    ]);
    const [dataChildren, setDataChildren] = useState([
        { name: '없어요', id: false, selected: true },
        { name: '있어요', id: true, selected: false },
    ]);

    const margins = 12;
    const numColumns = 2;

    const onPressMarriageButton = (index: number) => {
        setDataMarriage((previousValue) => {
            return previousValue.map((item, idx) => {
                if (index === idx) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }

                return item;
            });
        });
    };

    const onPressChildrenButton = (index: number) => {
        setDataChildren((previousValue) => {
            return previousValue.map((item, idx) => {
                if (index === idx) {
                    item.selected = true;
                } else {
                    item.selected = false;
                }

                return item;
            });
        });
    };

    const checkAllDataSelect = () => {
        const marriageCheck = dataMarriage
            .reduce((prev, curr) => {
                return prev || curr.selected;
            }, true);
        const childrenCheck = dataChildren
            .reduce((prev, curr) => {
                return prev || curr.selected;
            }, true);

        return marriageCheck && childrenCheck
    };

    useEffect(() => {
        if (userInfo) {
            setDataMarriage((previousValue) => {
                return previousValue.map((item) => {
                    if (item.id === userInfo.hasMarriage) {
                        item.selected = true;
                    } else {
                        item.selected = false;
                    }

                    return item;
                });
            });

            setDataChildren((previousValue) => {
                return previousValue.map((item) => {
                    if (item.id === userInfo.hasChildren) {
                        item.selected = true;
                    } else {
                        item.selected = false;
                    }

                    return item;
                });
            });
        }
    }, [userInfo]);

    return (
        <View style={styles.container}>
            <AppHeader style={styles.headerContainer}>
                <AppIcon
                    name='back'
                    width={42}
                    height={42}
                    onPress={backButtonHandler}
                />
                <AppButton 
                    text='건너뛰기'
                    textStyle={styles.passButtonText}
                    onPressButton={closeStartProcess}
                />
            </AppHeader>
            <View>
                <View style={styles.textContainer}>
                    <AppText style={styles.titleText}>결혼 및 자녀 정보를 알려주세요</AppText>
                    <AppText style={styles.subTitleText}>다양한 혜택과 제도에 대해 알려드려요</AppText>
                </View>
            </View>
            <View style={{ gap: 16, paddingBottom: 15 }}>
                <AppText style={styles.subText}>결혼 여부 선택</AppText>
                <FlatList 
                    data={dataMarriage}
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
                                onPressButton={() => onPressMarriageButton(index)}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => String(index)}
                    numColumns={numColumns}
                    style={{ 
                        flexGrow: 0,
                        flexShrink: 0,
                        overflow: 'hidden',
                    }}
                />
            </View>
            <View style={{ gap: 16 }}>
                <AppText style={styles.subText}>자녀 유무 선택</AppText>
                <FlatList 
                    data={dataChildren}
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
                                onPressButton={() => onPressChildrenButton(index)}
                            />
                        );
                    }}
                    keyExtractor={(item, index) => String(index)}
                    numColumns={numColumns}
                    style={{ 
                        flexGrow: 0,
                        flexShrink: 0,
                        overflow: 'hidden',
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    text='다음'
                    textStyle={styles.nextButtonText}
                    buttonStyle={[styles.nextButton, !checkAllDataSelect() ? styles.nextButtonDisabled : {}]}
                    onPressButton={!checkAllDataSelect() ? () => {} : () => nextButtonHandler({ dataMarriage, dataChildren })}
                />
            </View>
        </View>
    );
};

const Welcome = ({
    backButtonHandler,
    nextButtonHandler,
}: SurveyProccessProps): React.JSX.Element => {
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
                    <AppText style={styles.welcomeText}>어서오세요! 인생비서에</AppText>
                    <AppText style={styles.welcomeText}>오신것을 환영합니다</AppText>
                </View>
            </View>
            <View>
                <View style={{
                    position: 'absolute',
                    left: -10,
                    top: -30,
                }}>
                    <Image 
                        source={require('@/assets/gif/happy_birthday.gif')}
                        style={styles.imageBirthDay}
                    />
                </View>
                <View style={{
                    position: 'absolute',
                    left: '-15%',
                    top: 100,
                    zIndex: 1,
                }}>
                    <Image 
                        source={require('@/assets/gif/people_using_robots.gif')}
                        style={styles.imagePersonRobot}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    text='시작하기'
                    textStyle={styles.nextButtonText}
                    buttonStyle={styles.nextButton}
                    onPressButton={nextButtonHandler}
                />
            </View>
        </View>
    );
};

type SurveyProps = {
    isVisible: boolean;
    closeModalHandler: () => void;
    closeStartProcess: () => void;
};

const Survey = ({
    isVisible,
    closeModalHandler,
    closeStartProcess,
}: SurveyProps): React.JSX.Element => {

    const openOrCloseSurvey = (number: number) => {
        setData((previousData) => {
            const newData = previousData.map((item, index) => {
                if (number === index) {
                    item.isShow = true;
                } else {
                    item.isShow = false;
                }

                return item;
            });

            return newData;
        });
    };

    const [userInfo, setUserInfo] = useState({
        nickName: '',
        year: '',
        month: '',
        day: '',
        gender: '',
        categories: [],
        occupations: [],
        hasMarriage: false,
        hasChildren: false,
    });

    // [다음] 버튼 - nickname 저장
    const onClickNextButtonInNickName = (nickName: string) => {
        setUserInfo((previousValue) => {
            previousValue.nickName = nickName;
            return Object.assign({}, previousValue);
        });
        openOrCloseSurvey(1);
    };

    // [다음] 버튼 - year/month/day 저장
    const onClickNextButtonBirthDate = (birthDate: {
        year: string;
        month: string;
        day: string;
    }) => {
        const { year, month, day } = birthDate

        setUserInfo((previousValue) => {
            previousValue.year = year;
            previousValue.month = month;
            previousValue.day = day;
            return Object.assign({}, previousValue);
        });
        openOrCloseSurvey(2);
    };

    // [다음] 버튼 - gender 저장
    const onClickNextButtonGender = (genderData: any) => {
        const data = genderData.find((item: any) => item.selected === true);

        setUserInfo((previousValue) => {
            previousValue.gender = data.id;
            return Object.assign({}, previousValue);
        });
        openOrCloseSurvey(3);
    };

    // [다음] 버튼 - category 저장
    const onClickNextButtonCategory = (categoryData: any) => {
        setUserInfo((previousValue) => {
            const categories = categoryData
                .map((item: any) => item.id)
                .filter((item: any) => item !== '');
            previousValue.categories = categories;
            return Object.assign({}, previousValue);
        });
        openOrCloseSurvey(4);
    };

    // [다음 버튼] - occupation 저장
    const onClickNextButtonOccupation = (occupationData: any) => {
        setUserInfo((previousValue) => {
            const occupations = occupationData
                .map((item: any) => item.id)
                .filter((item: any) => item !== '');
            previousValue.occupations = occupations;
            return Object.assign({}, previousValue);
        });
        openOrCloseSurvey(5);
    };

    // [다음 버튼] - marriage/children 저장
    const onClickNextButtonMarriage = (marriageData: any) => {
        const { dataMarriage, dataChildren } = marriageData;
        const marriage = dataMarriage.find((item: any) => item.selected === true).id;
        const children = dataChildren.find((item: any) => item.selected === true).id;

        setUserInfo((previousValue) => {
            previousValue.hasMarriage = marriage;
            previousValue.hasChildren = children;
            return Object.assign({}, previousValue);
        });
        openOrCloseSurvey(6);
    }

    const [data, setData] = useState([
        { 
            isShow: true, 
            component:  
                <GetNickName
                    userInfo={userInfo} 
                    backButtonHandler={closeModalHandler}
                    nextButtonHandler={onClickNextButtonInNickName}
                 />,
        },
        {
            isShow: false,
            component:
                <GetBirthDate 
                    userInfo={userInfo} 
                    backButtonHandler={() => openOrCloseSurvey(0)}
                    nextButtonHandler={onClickNextButtonBirthDate}
                />
        },
        {
            isShow: false,
            component: 
                <GetGender 
                    userInfo={userInfo}
                    backButtonHandler={() => openOrCloseSurvey(1)}
                    nextButtonHandler={onClickNextButtonGender}
                />
        },
        {
            isShow: false,
            component: 
                <GetCategory 
                    userInfo={userInfo}
                    backButtonHandler={() => openOrCloseSurvey(2)}
                    nextButtonHandler={onClickNextButtonCategory}
                />
        },
        {
            isShow: false,
            component: 
                <GetOccupation 
                    userInfo={userInfo}
                    backButtonHandler={() => openOrCloseSurvey(3)}
                    nextButtonHandler={onClickNextButtonOccupation}
                    closeStartProcess={closeStartProcess}
                />
        },
        {
            isShow: false,
            component: 
                <GetMarriage 
                    userInfo={userInfo}
                    backButtonHandler={() => openOrCloseSurvey(4)}
                    nextButtonHandler={onClickNextButtonMarriage}
                    closeStartProcess={closeStartProcess}
                />
        },
        {
            isShow: false,
            component: 
                <Welcome 
                    backButtonHandler={() => openOrCloseSurvey(5)}
                    nextButtonHandler={closeStartProcess}
                />
        }
    ]);

    // useEffect(() => {
    //     console.log('userInfo', userInfo);
    // }, [userInfo]);

    return (
        <AppModal
            isVisible={isVisible}
        >
            {data.map((item) => {
                return (
                    item.isShow && item.component
                );
            })}
        </AppModal>
    );
};

const styles = StyleSheet.create({
    keyBoardAvoidingContainer: {
        width: '100%',
        flex: 1,
    },

    container: {
        width: '100%',
        flex: 1,
        paddingHorizontal: 24,
    },

    headerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    passButtonText: {
        fontWeight: '500',
        fontSize: getFontSize(14),
        lineHeight: 17,
        color: '#40474F'
    },

    textContainer: {
        gap: 10,
        paddingBottom: 30,
    },

    titleText: {
        fontWeight: '700',
        fontSize: getFontSize(24),
        lineHeight: 29,
        color: '#000E24'
    },

    subTitleText: {
        fontWeight: '500',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: '#526070'
    },

    textInput: {
        width: '100%',

        fontWeight: '600',
        fontSize: getFontSize(26),
        lineHeight: 32,
        textAlign: 'center',

        paddingVertical: 10,
        paddingHorizontal: 44,
        borderWidth: 1.5,
        borderColor: '#F2F4F7',
        borderRadius: 10,
    },
    textInputError: {
        borderColor: '#E44848',
    },

    textInputBirth: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'center',

        paddingVertical: 10,
        paddingHorizontal: 44,
        borderWidth: 1.5,
        borderColor: '#F2F4F7',
        borderRadius: 10,
    },
    textBirth: {
        fontWeight: '600',
        fontSize: getFontSize(26),
        lineHeight: 32,
    },

    buttonContainer: {
        width: '100%',
        position: 'absolute',
        left: 24,
        bottom: 50,
    },
    nextButtonText: {
        fontWeight: '600',
        fontSize: getFontSize(16),
        lineHeight: 20,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    nextButton: {
        paddingVertical: 16,
        paddingHorizontal: 106,
        borderRadius: 10,
        backgroundColor: '#0B2A4F',
    },
    nextButtonDisabled: {
        opacity: 0.3
    },

    buttonSelectedText: {
        fontWeight: '700',
        fontSize: getFontSize(18),
        lineHeight: 22,
        color: '#0B2A4F',
        textAlign: 'center',
    },
    buttonSelected: {
        paddingVertical: 15,
        borderWidth: 1.5,
        borderColor: '#0B2A4F',
        borderRadius: 12,
        backgroundColor: '#E7EDF3',
    },

    buttonUnselectedText: {
        fontWeight: '600',
        fontSize: getFontSize(18),
        lineHeight: 22,
        color: '#A1ACB9',
        textAlign: 'center',
    },
    buttonUnselected: {
        paddingVertical: 15,
        borderRadius: 12,
        backgroundColor: '#F2F4F7'
    },

    subText: {
        fontWeight: '500',
        fontSize: getFontSize(14),
        lineHeight: 17,
        color: '#526070'
    },

    imageBirthDay: {
        width: 348,
        height: 348,
    },
    imagePersonRobot: {
        width: 388,
        height: 262,
    },

    welcomeText: {
        fontWeight: '600',
        fontSize: getFontSize(26),
        lineHeight: 32,
        color: '#000E24'
    },
})

export default Survey;