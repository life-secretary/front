import * as React from 'react';
import {Button, Pressable, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppText} from '../components/common/AppText';
import {TodoDetail} from '../components/todo/detail/TodoDetail';
import {SubTodoList} from '../components/todo/detail/SubTodoList';

const DUMMY_DATA = {
  id: '1',
  category: '경제',
  title: '나의 미래 준비, 어떻게 시작할까요?',
  subTodoList: [
    {id: '1', title: '노후 예상 비용 계산하기', isChecked: false},
    {id: '2', title: '월 저축액 계획하기', isChecked: false},
    {id: '3', title: 'ISA 계좌 만들기', isChecked: false},
    {id: '4', title: '국가 지원 정책 알아보기', isChecked: false},
  ],
  createdDate: '2024. 01. 01',
};

export function TodoDetailModalScreen({navigation}: any) {
  return (
    <SafeAreaView style={styles.layout}>
      <View style={styles.header}>
        <Pressable style={styles.button}>
          <Button
            onPress={() => navigation.goBack()}
            color="#FFFFFF"
            title="<"
          />
        </Pressable>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <AppText style={styles.buttonText}>완료</AppText>
          </Pressable>
          <Pressable style={styles.button}>
            <AppText style={styles.buttonText}>{'...'}</AppText>
          </Pressable>
        </View>
      </View>
      <View style={styles.container}>
        <TodoDetail {...DUMMY_DATA} />
        <SubTodoList subTodoList={DUMMY_DATA.subTodoList} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#000E24',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 42,
    height: 42,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});
