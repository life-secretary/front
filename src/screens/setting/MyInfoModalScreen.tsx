import React, {useState} from 'react';
import {useRecoilValue} from 'recoil';
import {userState} from '@/store/userState';

import {StyleSheet, View} from 'react-native';
import {AppHeader} from '@/components/common/AppHeader';
import AppIcon from '@/components/common/AppIcon';
import {AppLayout} from '@/components/common/AppLayout';
import {AppText} from '@/components/common/AppText';
import {MyInfoEditForm} from '@/components/setting/my/MyInfoEditForm';
import {MyAgeRangeSelect} from '@/components/setting/my/MyAgeRangeSelect';
import {MyInfoWithdrawalForm} from '@/components/setting/my/MyInfoWithdrawalForm';
import {font} from '@/styles/font';
import color from '@/styles/color';

import {getFontSize} from '@/utils/font';
import AppBottomSheet from '@/components/common/modal/AppBottomSheet';

export function MyInfoModalScreen({route, navigation}: any): React.JSX.Element {
  const {headerTitle, menu} = route.params;
  const userInfo = useRecoilValue(userState);
  const AGE_RANGE_SELECT_OPTIONS = [
    {key: null, title: '선택안함'},
    {key: 'TEEN', title: '청소년 (14 ~ 18세)'},
    {key: 'YOUTH', title: '청년 (19 ~ 29세)'},
    {key: 'ADULT', title: '성인 (30 ~ 59세)'},
    {key: 'SENIOR', title: '중장년 (60세 ~ )'},
  ];
  const defaultAgeRange = AGE_RANGE_SELECT_OPTIONS.find(
    option => option.key === userInfo?.ageRange,
  );

  const [selectedAgeRange, setSelectedAgeRange] = useState(defaultAgeRange);

  const handleBackButtonPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <AppLayout isUsedPadding={false}>
        <AppHeader style={styles.header}>
          <View style={styles.button}>
            <AppIcon
              name="back"
              width={42}
              height={42}
              onPress={handleBackButtonPress}
            />
          </View>
          {headerTitle && (
            <View>
              <AppText style={styles.headerTitle}>{headerTitle}</AppText>
            </View>
          )}
        </AppHeader>
        <View style={styles.divider} />
        {menu?.key === 'edit' && (
          <MyInfoEditForm selectedAgeRange={selectedAgeRange} />
        )}
        {menu?.key === 'withdrawal' && <MyInfoWithdrawalForm />}
      </AppLayout>
      <AppBottomSheet snapPointsArr={['48%']}>
        <MyAgeRangeSelect
          selectOptions={AGE_RANGE_SELECT_OPTIONS}
          handleSelectAgeRange={(arg: object) => setSelectedAgeRange(arg)}
        />
      </AppBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 42,
    marginTop: 12,
    marginBottom: 8,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: getFontSize(20),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 23.87,
    color: color.grey.grey700,
  },
  button: {
    position: 'absolute',
    left: 0,
    paddingLeft: 24,
  },
  divider: {
    backgroundColor: color.grey.grey100,
    height: 1,
  },
});
