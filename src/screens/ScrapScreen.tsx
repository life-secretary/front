import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {scrapListState, scrapListTotalCountState} from '@/store/scrapState';
import {deleteData, fetchData} from '@/api/api';

import {FlatList, StyleSheet, View} from 'react-native';
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
import {getFontSize} from '@/utils/font';

type Mode = 'READ' | 'EDIT' | 'DELETE' | '';
type ButtonText = '편집' | '취소' | '삭제' | '';

export function ScrapScreen({navigation}: any): React.JSX.Element {
  const [mode, setMode] = useState<Mode>('READ');
  const [buttonText, setButtonText] = useState<ButtonText>('편집');
  const [totalCheckedCount, setTotalCheckedCount] = useState(0);
  const [checkedList, setCheckedList] = useState<object[]>([]);
  const setScrapList = useSetRecoilState(scrapListState);
  const [isDeleted, setIsDeleted] = useState(false);
  const totalCount = useRecoilValue(scrapListTotalCountState);
  const scrollViewRef = useRef(null);

  const reset = useCallback(() => {
    setCheckedList([]);
    setTotalCheckedCount(0);
    switchMode('read');
  }, []);

  const switchMode = (action: string) => {
    switch (action) {
      case 'read':
        setMode('READ');
        setButtonText('편집');
        setIsDeleted(false);
        break;
      case 'edit':
        setMode('EDIT');
        setButtonText('취소');
        break;
      case 'delete':
        setMode('DELETE');
        setButtonText('삭제');
        break;
      default:
        setMode('');
        setButtonText('');
    }
  };

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

  const fetchScraps = async () => {
    const res = await fetchData('/scrap', null);

    return res.data.data;
  };

  const {data, isLoading, refetch, error} = useQuery({
    queryKey: ['scraps'],
    queryFn: fetchScraps,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  if (error && !isLoading) {
    throw error;
  }

  const deleteScrapList = async (list: object[]) => {
    const idList = list.map((item: object) => item?.id).join(',');
    const res = await deleteData('/scrap', {}, idList);

    if (res.status !== 200) {
      throw Error('Network Error');
    }

    refetch();
    setIsDeleted(true);
    reset();
  };

  useEffect(() => {
    if (data) {
      setScrapList(data);
    }
  }, [data, setScrapList]);

  useFocusEffect(
    useCallback(() => {
      refetch();

      const unsubscribe = navigation.addListener('tabPress', e => {
        e.preventDefault();
        scrollViewRef?.current.scrollToOffset({offset: 0, animated: true});
      });

      return () => {
        unsubscribe();
        reset();
      };
    }, [navigation, refetch, reset]),
  );

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
        <FlatList
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          data={[]}
          keyExtractor={() => 'scrollview'}
          renderItem={null}
          ListHeaderComponent={
            <>
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
            </>
          }
        />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    marginTop: 21, // 아이콘 없는 헤더
  },
  container: {
    flex: 1,
  },
  title: {
    height: 24,
    textAlign: 'center',
    fontSize: getFontSize(20),
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
    fontSize: getFontSize(18),
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
