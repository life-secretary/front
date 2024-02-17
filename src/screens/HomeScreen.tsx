import * as React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {AppLayout} from '../components/common/AppLayout';
import {AppHeader} from '../components/common/AppHeader';
import {HomeCategoryList} from '../components/home/HomeCategoryList';
import {HomeImageCarousel} from '../components/home/HomeImageCarousel';
import {HomeContentsList} from '../components/home/HomeContentsList';
import {SendQuestionButton} from '../components/home/SendQuestionButton';
import {HomeTitle} from '../components/home/HomeTitle';

export function HomeScreen(): React.JSX.Element {
  return (
    <AppLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AppHeader>
          <HomeTitle text="2024. 01. 14" style={styles.dateText} />
        </AppHeader>
        <HomeCategoryList />
        <HomeImageCarousel />
        <HomeContentsList />
        <HomeContentsList />
        <HomeContentsList />
        <View style={styles.sendQuestioncontainer}>
          <HomeTitle
            text="Please send a question to the team"
            style={styles.sendQuestionText}
          />
          <SendQuestionButton />
        </View>
      </ScrollView>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  sendQuestioncontainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 34,
    borderWidth: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
  },
  sendQuestionText: {
    marginBottom: 18,
    fontSize: 15,
    fontWeight: '600',
  },
});
