import * as React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';
import {AppText} from '../common/AppText';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type ItemProps = {
  title: string;
  category: string;
  isEditMode: boolean;
};

export function SaveContentsItem({
  title,
  category,
  isEditMode,
}: ItemProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {isEditMode && (
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={18}
            fillColor="black"
            disableText
            onPress={(isChecked: boolean) => {
              console.log(isChecked);
            }}
          />
        </View>
      )}
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.tagContainer}>
            <AppText style={styles.tag}>{category}</AppText>
          </View>
          <AppText style={styles.title} isEllipsizeMode={true}>
            {title}
          </AppText>
        </View>
        <Pressable style={styles.button} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    gap: 11,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: 12,
    fontWeight: '600',
    color: '#A1ACB9',
    backgroundColor: '#F2F4F7',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  title: {
    fontWeight: '600',
    color: '#000E24',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A1ACB9',
  },
  button: {
    width: 42,
    height: 42,
    borderWidth: 1,
  },
  checkboxContainer: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    textAlign: 'center',
  },
});
