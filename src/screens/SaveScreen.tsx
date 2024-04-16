import React, {useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {scrapListState, scrapListTotalCountState} from '@/store/scrapState';
import {deleteData} from '@/api/api';

import {StyleSheet, View} from 'react-native';
import {AppLayout} from '@/components/common/AppLayout';
import {AppHeader} from '@/components/common/AppHeader';
import {AppText} from '@/components/common/AppText';
import {AppTitle} from '@/components/common/AppTitle';
import {AppDivider} from '@/components/common/AppDivider';
import AppButton from '@/components/common/AppButton';
import {ScrapContentsList} from '@/components/scrap/ScrapContentsList';
import color from '@/styles/color';
import {font} from '@/styles/font';
import spacing from '@/styles/spacing';

import {generateRandomId} from '@/utils';
import {removeItemAtIndex} from '@/utils';

interface ScrapContentsItem {
  id: number;
  category: object;
  title: string;
}

const SCRAP_CONTENTS_LIST: ScrapContentsItem[] = [
  {
    id: generateRandomId(),
    category: {key: 'economy', title: '경제'},
    title: '콘텐츠 제목 영역1',
  },
  {
    id: generateRandomId(),
    category: {key: 'law', title: '법'},
    title: '콘텐츠 제목 영역2',
  },
  {
    id: generateRandomId(),
    category: {key: 'eco', title: '환경'},
    title: '콘텐츠 제목 영역3',
  },
  {
    id: generateRandomId(),
    category: {key: 'selfdev', title: '자기계발'},
    title: '콘텐츠 제목 영역4',
  },
  {
    id: generateRandomId(),
    category: {key: 'health', title: '건강'},
    title: '콘텐츠 제목 영역5',
  },
];

export function SaveScreen(): React.JSX.Element {
  const [mode, setMode] = useState('READ'); // TODO: ENUM type 정의 ['READ', 'EDIT', 'DELETE']
  const [buttonText, setButtonText] = useState('');
  const [totalCheckedCount, setTotalCheckedCount] = React.useState(0);
  const [checkedList, setCheckedList] = useState<object[]>([]);
  const scrapList = useRecoilValue(scrapListState);
  // const totalCount = useRecoilValue(scrapListTotalCountState);
  const dummyScrapList = SCRAP_CONTENTS_LIST;
  const totalCount = dummyScrapList.length;

  const switchMode = (action: string) => {
    switch (action) {
      case 'read':
        setMode('READ');
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

  const deleteScrapList = async (list: object[]) => {
    // 임시 코드
    list.forEach(scrapItem => {
      const itemIndex = dummyScrapList.findIndex(
        item => item.id === scrapItem.id,
      );

      dummyScrapList.splice(itemIndex, 1);
    });

    setCheckedList([]);
    switchMode('read');

    // const idList = list.map((item: object) => item?.id);
    // const res = await deleteData('/scrap', {}, idList);

    // if (res.status === 200) {
    //   setCheckedList([]);
    //   switchMode('read');
    // }
  };

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
            ]}
            onPressButton={handleButtonPress}
          />
        </View>
        <AppDivider style={styles.divider} />
        <ScrapContentsList
          contentsList={scrapList.length > 0 ? scrapList : dummyScrapList} // 임시 코드
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
    marginTop: 16,
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
