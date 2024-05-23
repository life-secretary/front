import React, {useCallback, useEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {scrapListState, scrapListTotalCountState} from '@/store/scrapState';
import {userInfoState} from '@/store/userInfoState';
import {deleteData, fetchData} from '@/api/api';

import {StyleSheet, View} from 'react-native';
import {AppLayout} from '@/components/common/AppLayout';
import {AppHeader} from '@/components/common/AppHeader';
import {AppText} from '@/components/common/AppText';
import {AppTitle} from '@/components/common/AppTitle';
import {AppDivider} from '@/components/common/AppDivider';
import AppButton from '@/components/common/AppButton';
import {ScrapContentList} from '@/components/scrap/ScrapContentList';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

import {removeItemAtIndex} from '@/utils';

export function ScrapScreen(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState('READ'); // TODO: ENUM type 정의 ['READ', 'EDIT', 'DELETE']
  const [buttonText, setButtonText] = useState('');
  const [totalCheckedCount, setTotalCheckedCount] = React.useState(0);
  const [checkedList, setCheckedList] = useState<object[]>([]);
  const [scrapList, setScrapList] = useRecoilState(scrapListState);
  const [isDeleted, setIsDeleted] = useState(false);
  const totalCount = useRecoilValue(scrapListTotalCountState);
  const userInfo = useRecoilValue(userInfoState);

  const switchMode = (action: string) => {
    switch (action) {
      case 'read':
        setMode('READ');
        setIsDeleted(false);
        break;
      case 'edit':
        setMode('EDIT');
        break;
      case 'delete':
        setMode('DELETE');
        break;
      default:
        setMode('');
    }
  };

  // TODO: reset 함수 구현
  // const reset = () => {
  //   setCheckedList([]);
  //   setMode('READ');
  //   setIsDeleted(false);
  // };

  const handleButtonPress = () => {
    if (totalCount === 0) {
      return;
    }

    if (mode === 'READ') {
      switchMode('edit');
      return;
    }

    if (mode === 'EDIT') {
      switchMode('read');
      return;
    }

    if (mode === 'DELETE') {
      deleteScrapList(checkedList);
      return;
    }
  };

  const manipulateCheckedList = (action: string, contents: object) => {
    if (action === 'push') {
      pushCheckedList(contents);
    }

    if (action === 'remove') {
      removeCheckedList(contents);
    }
  };

  const pushCheckedList = (contents: object) => {
    setCheckedList([...checkedList, contents]);
  };

  const removeCheckedList = (contents: object) => {
    const itemIndex = checkedList.findIndex(item => item.id === contents.id);
    const filteredList = removeItemAtIndex(checkedList, itemIndex);
    setCheckedList(filteredList);
  };

  // TODO: 중복 코드 제거 필요
  const fetchScrapList = useCallback(async () => {
    setIsLoading(true);
    const res = await fetchData('/scrap', {
      userId: userInfo.id,
    });
    const list = res.data.data;

    if (res.status === 200) {
      setScrapList(list);
      setIsLoading(false);
    }
  }, [setScrapList, userInfo.id]);

  const deleteScrapList = async (list: object[]) => {
    const idList = list.map((item: object) => item?.id).join(',');
    const res = await deleteData('/scrap', {}, idList);

    if (res.status === 200) {
      fetchScrapList();
      setIsDeleted(true);
      setCheckedList([]);
      switchMode('read');
    }
  };

  useEffect(() => {
    fetchScrapList();
  }, []);

  useEffect(() => {
    const switchButtonText = () => {
      switch (mode) {
        case 'READ':
          setButtonText('편집');
          break;
        case 'EDIT':
          setButtonText('취소');
          break;
        case 'DELETE':
          setButtonText('삭제');
          break;
        default:
          setButtonText('');
      }
    };

    switchButtonText();

    // return () => {
    //   reset();
    // };
  }, [mode]);

  return (
    <AppLayout>
      <AppHeader style={styles.header}>
        <AppTitle text="저장 목록" style={styles.title} />
      </AppHeader>
      <View style={styles.container}>
        <View style={styles.row}>
          <AppText style={styles.totalCountText}>
            {mode !== 'READ'
              ? `총 ${totalCheckedCount}개 선택`
              : `총 ${totalCount}개`}
          </AppText>
          <AppButton
            text={buttonText}
            textStyle={[
              styles.button,
              totalCount > 0
                ? {color: color.grey.grey400}
                : {color: color.grey.grey200},
              mode === 'DELETE' && {color: color.grey.grey700},
            ]}
            onPressButton={handleButtonPress}
          />
        </View>
        <AppDivider style={styles.divider} />
        <ScrapContentList
          isLoading={isLoading}
          isDeleted={isDeleted}
          checkedList={checkedList}
          mode={mode}
          manipulateCheckedList={manipulateCheckedList}
          handleButtonPress={switchMode}
          handleTotalCheckedCount={(count: number) =>
            setTotalCheckedCount(count)
          }
        />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    marginTop: 12,
  },
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: font.fontWeight.bold,
    lineHeight: 23.87,
    color: color.grey.grey700,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.layoutPaddingHorizontal,
  },
  divider: {
    marginTop: 7,
    marginBottom: 32,
  },
  totalCountText: {
    fontSize: 18,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 21.48,
    color: color.grey.grey600,
  },
  button: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
  },
});
