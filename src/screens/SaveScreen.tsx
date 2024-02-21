import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {AppText} from '../components/common/AppText';
import {SaveTitle} from '../components/save/SaveTitle';
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
    title: '콘텐츠 제목 영역',
  },
  {
    id: '2',
    category: '부동산',
    title: '콘텐츠 제목 영역',
  },
  {
    id: '3',
    category: '법',
    title: '콘텐츠 제목 영역',
  },
  {
    id: '4',
    category: '문화',
    title: '콘텐츠 제목 영역',
  },
  {
    id: '5',
    category: '기타',
    title: '콘텐츠 제목 영역',
  },
];

export function SaveScreen(): React.JSX.Element {
  const [isEditMode, setEditModeState] = React.useState(false);

  return (
    <AppLayout>
      <AppHeader>
        <SaveTitle text={'저장 목록'} style={styles.title} />
      </AppHeader>
      <View style={styles.container}>
        <View style={styles.row}>
          <AppText style={styles.totalCountText}>
            {isEditMode ? '총 0개 선택' : `총 ${DUMMY_DATA.length}개`}
          </AppText>
          <Pressable onPress={() => setEditModeState(prevState => !prevState)}>
            <AppText style={styles.editButton}>
              {isEditMode ? '취소' : '편집'}
            </AppText>
          </Pressable>
        </View>
        <SaveContentsList list={DUMMY_DATA} isEditMode={isEditMode} />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 32,
  },
  totalCountText: {
    fontSize: 18,
    fontWeight: '600',
  },
  editButton: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
});
