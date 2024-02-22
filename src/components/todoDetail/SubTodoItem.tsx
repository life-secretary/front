import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';

type ItemProps = {
  title: string;
};

export function SubTodoItem({title}: ItemProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.dragContainer}>
          <AppText style={styles.drag}>=</AppText>
        </View>
        <AppText style={styles.titleText}>{title}</AppText>
      </View>
      <View style={styles.checkboxContainer}>
        <AppText style={styles.checkbox}>O</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#E7EDF3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 18,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  titleText: {
    fontWeight: '600',
  },
  dragContainer: {
    borderWidth: 1,
    width: 24,
    height: 24,
  },
  drag: {
    textAlign: 'center',
  },
  checkboxContainer: {
    borderWidth: 1,
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox: {},
});
