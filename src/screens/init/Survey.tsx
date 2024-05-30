import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import AppModal from '@/components/common/modal/AppModal';

import { getFontSize } from '@/utils/font';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { userInfoState } from '@/store/login';

import GetNickName from '@/components/init/GetNickName';
import GetBirthDate from '@/components/init/GetBirthDate';
import GetGender from '@/components/init/GetGender';
import GetCategory from '@/components/init/GetCategory';
import GetOccupation from '@/components/init/GetOccupation';
import GetMarriage from '@/components/init/GetMarriage';
import Welcome from '@/components/init/Welcome';
import { fetchData } from '@/api/api';
import { categoryListState } from '@/store/categoryState';
import { occupationListState } from '@/store/occupation';
import Toast from 'react-native-toast-message';

export type SurveyProccessProps = {
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
    const setCategories = useSetRecoilState(categoryListState);
    const setOccupationList = useSetRecoilState(occupationListState);

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

    const fetchCategories = async () => {
        const res = await fetchData('/categories', null);
        if (res.status === 200) {
            setCategories(res.data.data);
        }
    };

    const fetchOccupations = async () => {
        const res = await fetchData('/occupation', {});
        if (res.status === 200) {
            setOccupationList(res.data.data);
        }
    };

    const onClickWelcomeButton = () => {
        // login api 요청 보내기
        closeStartProcess();
    };
    
    useEffect(() => {
      fetchCategories()
      fetchOccupations()
    }, [])

    const [data, setData] = useState([
        { 
            isShow: true, 
            component:  
                <GetNickName
                    backButtonHandler={closeModalHandler}
                    nextButtonHandler={() => openOrCloseSurvey(1)}
                 />,
        },
        {
            isShow: false,
            component:
                <GetBirthDate 
                    backButtonHandler={() => openOrCloseSurvey(0)}
                    nextButtonHandler={() => openOrCloseSurvey(2)}
                />
        },
        {
            isShow: false,
            component: 
                <GetGender 
                    backButtonHandler={() => openOrCloseSurvey(1)}
                    nextButtonHandler={() => openOrCloseSurvey(3)}
                />
        },
        {
            isShow: false,
            component: 
                <GetCategory 
                    backButtonHandler={() => openOrCloseSurvey(2)}
                    nextButtonHandler={() => openOrCloseSurvey(4)}
                />
        },
        {
            isShow: false,
            component: 
                <GetOccupation 
                    backButtonHandler={() => openOrCloseSurvey(3)}
                    nextButtonHandler={() => openOrCloseSurvey(5)}
                />
        },
        {
            isShow: false,
            component: 
                <GetMarriage 
                    backButtonHandler={() => openOrCloseSurvey(4)}
                    nextButtonHandler={() => openOrCloseSurvey(6)}
                />
        },
        {
            isShow: false,
            component: 
                <Welcome 
                    backButtonHandler={() => openOrCloseSurvey(5)}
                    nextButtonHandler={onClickWelcomeButton}
                />
        }
    ]);

    return (
        <AppModal
            isVisible={isVisible}
        >
            {data.map((item) => {
                return (
                    item.isShow && item.component
                );
            })}
            <Toast />
        </AppModal>
    );
};

export const styles = StyleSheet.create({
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
        marginTop: 25,
        left: -10,
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