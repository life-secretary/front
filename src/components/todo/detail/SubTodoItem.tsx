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
    <ScrollView horizontal={true} contentContainerStyle={styles.container}>
      <View style={styles.itemContainer}>
        <View style={styles.titleContainer}>
          <AppIcon name="hamburger" width={24} height={24} />
          <AppText style={styles.titleText}>{title}</AppText>
        </View>
        <BouncyCheckbox
          size={18}
          fillColor={color.grey500}
          iconStyle={{borderWidth: 1.5, marginHorizontal: 12}}
          disableText={true}
          isChecked={isChecked}
          onPress={() => setIsChecked(!isChecked)}
        />
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
    minWidth: '100%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#E7EDF3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 27,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
