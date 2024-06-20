import React, {useEffect, useState} from 'react';

import {useRecoilState} from 'recoil';
import {userInfoState} from '@/store/login';
import {userState} from '@/store/userState';

import {updateData} from '@/api/api';

import {View, FlatList} from 'react-native';
import {AppText} from '@/components/common/AppText';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import {styles} from '@/styles/survey';

const GetMarriage = ({navigation, route}: any) => {
  const {modify} = route.params;
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [editedUserInfo, setEditedUserInfo] = useRecoilState(userState);
  const [containerWidth, setContainerWidth] = useState(0);
  const [dataMarriage, setDataMarriage] = useState([
    {name: '미혼', id: false, selected: true},
    {name: '기혼', id: true, selected: false},
  ]);
  const [dataChildren, setDataChildren] = useState([
    {name: '없어요', id: false, selected: true},
    {name: '있어요', id: true, selected: false},
  ]);

  const margins = 12;
  const numColumns = 2;

  const editUserInfo = async () => {
    const newUserInfo = {
      ...editedUserInfo,
    };

    console.log(newUserInfo);
    return await updateData('/user', null, newUserInfo);
  };

  const resurvey = async () => {
    const {status} = await editUserInfo();

    if (status === 200) {
      navigation.navigate('Home');
    }
  };

  const onPressBackButton = () => {
    modify
      ? navigation.navigate('GetOccupation', {modify: true})
      : navigation.navigate('GetOccupation', {modify: false});
  };

  const onPressMarriageButton = (index: number) => {
    setDataMarriage(previousValue => {
      const newValue = previousValue.map((item, idx) => {
        if (index === idx) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      });

      if (modify) {
        setEditedUserInfo(previousValue => {
          const married = newValue.find(item => item.selected);

          if (married) {
            return {
              ...previousValue,
              married: married.id,
            };
          }

          return {
            ...previousValue,
            married: false,
          };
        });
      } else {
        setUserInfo(previousValue => {
          const married = newValue.find(item => item.selected);

          if (married) {
            return {
              ...previousValue,
              married: married.id,
            };
          }

          return {
            ...previousValue,
            married: false,
          };
        });
      }

      return newValue;
    });
  };

  const onPressChildrenButton = (index: number) => {
    setDataChildren(previousValue => {
      const newValue = previousValue.map((item, idx) => {
        if (index === idx) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      });

      if (modify) {
        setEditedUserInfo(previousValue => {
          const hasChild = newValue.find(item => item.selected);

          if (hasChild) {
            return {
              ...previousValue,
              hasChild: hasChild.id,
            };
          }

          return {
            ...previousValue,
            hasChild: false,
          };
        });
      } else {
        setUserInfo(previousValue => {
          const hasChild = newValue.find(item => item.selected);

          if (hasChild) {
            return {
              ...previousValue,
              hasChild: hasChild.id,
            };
          }

          return {
            ...previousValue,
            hasChild: false,
          };
        });
      }

      return newValue;
    });
  };

  const checkAllDataSelect = () => {
    const marriageCheck = dataMarriage.reduce((prev, curr) => {
      return prev || curr.selected;
    }, true);
    const childrenCheck = dataChildren.reduce((prev, curr) => {
      return prev || curr.selected;
    }, true);

    return marriageCheck && childrenCheck;
  };

  const onPressSubmitButton = () => {
    modify ? resurvey() : navigation.navigate('Welcome');
  };

  useEffect(() => {
    const currentUserInfo = modify ? editedUserInfo : userInfo;

    setDataMarriage(previousValue => {
      return previousValue.map(item => {
        if (item.id === currentUserInfo?.married) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      });
    });

    setDataChildren(previousValue => {
      return previousValue.map(item => {
        if (item.id === currentUserInfo?.hasChild) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      });
    });
  }, [editedUserInfo, modify, userInfo]);

  return (
    <View style={styles.container}>
      <AppHeader style={styles.headerContainer}>
        <AppIcon
          name="back"
          width={42}
          height={42}
          onPress={() => onPressBackButton()}
        />
        <AppButton
          text="건너뛰기"
          textStyle={styles.passButtonText}
          onPressButton={
            modify ? () => resurvey() : () => navigation.navigate('Welcome')
          }
        />
      </AppHeader>
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <AppText style={styles.titleText}>
            결혼 및 자녀 정보를 알려주세요
          </AppText>
          <AppText style={styles.subTitleText}>
            다양한 혜택과 제도에 대해 알려드려요
          </AppText>
        </View>
      </View>
      <View style={{gap: 16, paddingBottom: 15}}>
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
                textStyle={
                  item.selected
                    ? styles.buttonSelectedText
                    : styles.buttonUnselectedText
                }
                buttonStyle={[
                  {
                    width: (containerWidth - margins) / numColumns,
                  },
                  item.selected
                    ? styles.buttonSelected
                    : styles.buttonUnselected,
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
      <View style={{gap: 16}}>
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
                textStyle={
                  item.selected
                    ? styles.buttonSelectedText
                    : styles.buttonUnselectedText
                }
                buttonStyle={[
                  {
                    width: (containerWidth - margins) / numColumns,
                  },
                  item.selected
                    ? styles.buttonSelected
                    : styles.buttonUnselected,
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
          text={modify ? '완료' : '다음'}
          textStyle={styles.nextButtonText}
          buttonStyle={[
            styles.nextButton,
            !checkAllDataSelect() ? styles.nextButtonDisabled : {},
          ]}
          onPressButton={
            !checkAllDataSelect() ? () => {} : () => onPressSubmitButton()
          }
        />
      </View>
    </View>
  );
};

export default GetMarriage;
