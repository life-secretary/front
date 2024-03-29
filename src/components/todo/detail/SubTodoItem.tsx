import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {AppText} from '../../common/AppText';
import AppIcon from '@/components/common/AppIcon';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import color from '@/styles/color';
import AppButton from '@/components/common/AppButton';

type ItemProps = {
  title: string;
  isCompleted: boolean;
};

export function SubTodoItem({
  title,
  isCompleted,
}: ItemProps): React.JSX.Element {
  const [isChecked, setIsChecked] = React.useState(isCompleted);

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.container}
      onScrollEndDrag={() => console.log('scroll')}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.wrapper}>
            <AppIcon name="hamburger" width={24} height={24} />
            <AppText style={styles.titleText}>{title}</AppText>
          </View>
          <View style={styles.divider} />
        </View>
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={18}
            fillColor={color.grey500}
            iconStyle={{borderWidth: 1.5, marginHorizontal: 12}}
            disableText={true}
            isChecked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
          />
        </View>
      </View>
      <AppButton
        text="지우기"
        textStyle={styles.deleteButtonText}
        buttonStyle={styles.deleteButton}
        startIcon={{
          type: 'stroke',
          name: 'trash',
          width: 32,
          height: 32,
          styles: { color: '#FFFFFF' }
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
  },
  itemContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: color.grey200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    height: '100%',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    borderWidth: 1,
    borderColor: color.grey200,
    borderStyle: 'dashed',
  },
  checkboxContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: '600',
  },
  deleteButton: {
    gap: 4,
    borderRadius: 10,
    paddingHorizontal: 17,
    paddingVertical: 12,
    backgroundColor: color.error,
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: color.white,
  },
});
