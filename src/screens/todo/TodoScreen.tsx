import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {fetchData} from '@/api/api';
import {useSetRecoilState} from 'recoil';
import {todoListState} from '@/store/todoState';
// import {userInfoState} from '@/store/login';

import {StyleSheet, View, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppLayout} from '@/components/common/AppLayout';
import {AppHeader} from '@/components/common/AppHeader';
import {AppTitle} from '@/components/common/AppTitle';
import AppIcon from '@/components/common/AppIcon';
import {TodoTabBar} from '@/components/todo/TodoTabBar';
import {OngoingTodoList} from '@/components/todo/OngoingTodoList';
import {CompletedTodoList} from '@/components/todo/CompletedTodoList';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFontSize} from '@/utils/font';
import {useQuery} from '@tanstack/react-query';

export function TodoScreen({navigation}: any): React.JSX.Element {
  const [showGradient, setShowGradient] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const setTodoList = useSetRecoilState(todoListState);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollViewRef = useRef<any>(null);

  const moveToScreen = (screen: string, params: object) => {
    navigation.navigate(screen, params);
  };

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
  };

  const handleAddButtonPress = () => {
    moveToScreen('TodoForm', {
      form: 'TODO',
      headerTitle: '할 일 생성하기',
    });
  };

  const fetchTodoList = async () => {
    const res = await fetchData('/user-todos', null);

    return res.data.data;
  };

  const {
    data: todos,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  if (error && !isLoading) {
    throw error;
  }

  const handleScroll = event => {
    const {nativeEvent} = event;

    const top = nativeEvent.contentOffset.y <= 1;

    if (top) {
      setShowGradient(false);
    } else {
      setShowGradient(true);
    }
  };

  useEffect(() => {
    if (todos) {
      setTodoList(todos);
      setIsFetched(true);
    }
  }, [setTodoList, todos]);

  useFocusEffect(
    useCallback(() => {
      refetch();

      const unsubscribe = navigation.addListener('tabPress', e => {
        e.preventDefault();
        scrollViewRef?.current.scrollToOffset({offset: 0, animated: true});
      });

      return unsubscribe;
    }, [navigation, refetch]),
  );

  return (
    <AppLayout style={styles.layout} isPaddingUsed={true}>
      <AppHeader style={styles.header}>
        <View style={styles.titleContainer}>
          <AppTitle text="To Do" style={styles.title} />
        </View>
        <View style={styles.iconContainer}>
          <AppIcon
            name="addDark"
            width={42}
            height={42}
            onPress={() => handleAddButtonPress()}
          />
        </View>
      </AppHeader>
      <View style={styles.container}>
        <>
          <TodoTabBar
            tabOptions={['진행 중', '완료']}
            selectedIndex={selectedIndex}
            onTabPress={(index: number) => handleTabChange(index)}
          />
          {showGradient && (
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['rgba(242, 244, 247, 1)', 'rgba(242, 244, 247, 0)']}
              style={styles.gradient}
            />
          )}
        </>
        <FlatList
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          data={[]}
          keyExtractor={() => 'scrollview'}
          renderItem={null}
          ListHeaderComponent={
            <>
              {selectedIndex === 0 && (
                <OngoingTodoList isLoading={isLoading} isFetched={isFetched} />
              )}
              {selectedIndex === 1 && (
                <CompletedTodoList
                  isLoading={isLoading}
                  isFetched={isFetched}
                />
              )}
            </>
          }
        />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  layout: {
    backgroundColor: color.grey.grey100,
  },
  container: {
    flex: 1,
  },
  tabBarContainer: {},
  header: {
    justifyContent: 'flex-end',
    marginTop: 12, // 아이콘 있는 헤더
    zIndex: 2,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    height: 24,
    fontSize: getFontSize(20),
    fontWeight: font.fontWeight.bold,
    lineHeight: 23.87,
    letterSpacing: font.letterSpacing.medium,
  },
  iconContainer: {},
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
    zIndex: 1,
  },
});
