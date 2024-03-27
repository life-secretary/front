import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import color from '@/styles/color';

import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {AppText} from '../components/common/AppText';
import {AppTitle} from '@/components/common/AppTitle';
import AppButton from '@/components/common/AppButton';
import {SaveContentsList} from '../components/save/SaveContentsList';

interface SaveContentsItem {
  id: string;
  category: string;
  title: string;
}

const DUMMY_DATA: SaveContentsItem[] = [
  {
    id: '1',
    category: '경제',
    title: '콘텐츠 제목 영역1',
  },
  {
    id: '2',
    category: '부동산',
    title: '콘텐츠 제목 영역2',
  },
  {
    id: '3',
    category: '법',
    title: '콘텐츠 제목 영역3',
  },
  {
    id: '4',
    category: '문화',
    title: '콘텐츠 제목 영역4',
  },
  {
    id: '5',
    category: '기타',
    title: '콘텐츠 제목 영역5',
  },
];

export function SaveScreen(): React.JSX.Element {
  const [isEditMode, setEditModeState] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('편집');
  const [totalCheckedCount, setTotalCheckedCount] = React.useState(0);

  const totalCount = DUMMY_DATA.length;

  const handleButtonPress = (prevState: boolean) => {
    setEditModeState(!prevState);
  };

  React.useEffect(() => {
    isEditMode ? setButtonText('취소') : setButtonText('편집');
  }, [isEditMode]);

  return (
    <AppLayout>
      <AppHeader style={styles.header}>
        <AppTitle text="저장 목록" style={styles.title} />
      </AppHeader>
      <View style={styles.container}>
        <View style={styles.row}>
          <AppText style={styles.totalCountText}>
            {isEditMode
              ? `총 ${totalCheckedCount}개 선택`
              : `총 ${totalCount}개`}
          </AppText>
          <AppButton
            text={buttonText}
            textStyle={styles.editButton}
            onPressButton={() => handleButtonPress(isEditMode)}
          />
        </View>
        <View style={styles.divider} />
        <SaveContentsList
          list={DUMMY_DATA}
          isEditMode={isEditMode}
          changeButtonText={(text: string) => setButtonText(text)}
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
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: color.grey100,
    marginTop: 7,
    marginBottom: 32,
  },
  totalCountText: {
    fontSize: 18,
    fontWeight: '600',
    color: color.grey600,
  },
  editButton: {
    paddingHorizontal: 6,
    paddingVertical: 8,
    fontWeight: '600',
    color: DUMMY_DATA.length > 0 ? color.grey400 : color.grey200,
  },
});
