import React, {useEffect, useState} from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';

import {AppText} from '@/components/common/AppText';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import AppButton from '@/components/common/AppButton';

import {useRecoilState} from 'recoil';
import {userInfoState} from '@/store/login';

import {styles} from '@/styles/survey';
import {FlatList} from 'react-native-gesture-handler';

const GetAgeRange = ({navigation}: any) => {
  const margins = 12;
  const numColumns = 2;

  const [data, setDate] = useState([
    { key: 'TEEN', title: '청소년 (14 ~ 18세)', selected: false },
    { key: 'YOUTH', title: '청년 (19 ~ 29세)', selected: false },
    { key: 'ADULT', title: '성인 (30 ~ 59세)', selected: false },
    { key: 'SENIOR', title: '중장년 (60세 ~ )', selected: false },
    { key: null, title: '모두 알고 싶어요', selected: false },
  ]);

  const [containerWidth, setContainerWidth] = useState(0);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const checkisSelected = () => {
    return data.reduce((prev: any, curr: any) => {
      if (curr.selected) {
        return true;
      } 
      return prev || false;
    }, false);
  };

  const onChangeUserAgeRange = (rangeKey: null | String) => {
    setDate((prev: any) => {
      return prev.map((item: any) => {

        if (item.key === rangeKey) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      });
    });

    setUserInfo((prev: any) => {
      return {
        ...prev,
        ageRange: rangeKey,
      };
    });
  };

  useEffect(() => {
    if (userInfo) {
      setDate((prev: any) => prev.map((item: any) => {
        if (item.key === userInfo.ageRange) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      }))
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyBoardAvoidingContainer}>
      <View style={styles.container}>
        <AppHeader style={styles.headerContainer}>
          <AppIcon
            name="back"
            width={42}
            height={42}
            onPress={() => navigation.navigate('GetNickName')}
          />
          <AppButton
            text="건너뛰기"
            textStyle={styles.passButtonText}
            onPressButton={() => navigation.navigate('GetGender', { modify: false })}
          />
        </AppHeader>
        <View style={styles.titleContainer}>
          <View style={styles.textContainer}>
            <AppText style={styles.titleText}>연령층을 선택해 주세요</AppText>
            <AppText style={styles.subTitleText}>
              연령층에 적절한 정보를 제공해드리기 위해 필요해요 
            </AppText>
          </View>
        </View>
        <FlatList 
          data={data}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
          renderItem={({item}) => {
            return (
              <AppButton
                text={item.title}
                textStyle={
                  item.selected
                    ? styles.buttonSelectedText
                    : styles.buttonUnselectedText
                }
                buttonStyle={[
                  {
                    width: (containerWidth - margins) / numColumns,
                  },
                  item.selected ? styles.buttonSelected : styles.buttonUnselected,
                ]}
                onPressButton={() => onChangeUserAgeRange(item.key)}
              />
            );
          }}
          keyExtractor={(item, index) => String(index)}
          numColumns={numColumns}
        />
        <View style={styles.buttonContainer}>
          <AppButton
            text="다음"
            textStyle={styles.nextButtonText}
            buttonStyle={[
              styles.nextButton,
              !checkisSelected() ? styles.nextButtonDisabled : {},
            ]}
            onPressButton={
              !checkisSelected() ? () => {} : () => navigation.navigate('GetGender', { modify: false })}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GetAgeRange;