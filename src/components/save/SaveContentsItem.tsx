import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import color from '@/styles/color';
import AppIcon from '../common/AppIcon';

type ItemProps = {
  item: object;
  isEditMode: boolean;
  changeButtonText: Function;
  handleCheckedContentsList: Function;
};

export function SaveContentsItem({
  item,
  isEditMode,
  handleCheckedContentsList,
}: ItemProps): React.JSX.Element {
  const [isSaved, setIsSaved] = React.useState(false);
  let mode: string = '';

  const handleSaveButtonPress = (prevState: boolean) => {
    setIsSaved(!prevState);
  };

  const handleCheckboxPress = (contents: object, mode: string) => {
    handleCheckedContentsList(contents, mode);
  };
  return (
    <View style={styles.container}>
      {isEditMode && (
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={18}
            fillColor={color.grey500}
            disableText
            onPress={(isChecked: boolean) => {
              console.log(isChecked);
              isChecked ? (mode = 'ADD') : (mode = 'DELETE');
              handleCheckboxPress(item, mode);
            }}
          />
        </View>
      )}
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.tagContainer}>
            <AppText style={styles.tag}>{item.category}</AppText>
          </View>
          <AppText style={styles.title} isEllipsizeMode={true}>
            {item.title}
          </AppText>
        </View>
        {isSaved ? (
          <AppIcon
            type="fill"
            name="bookmarkLight"
            width={42}
            height={42}
            styles={{fill: color.grey400}}
            onPress={() => handleSaveButtonPress(isSaved)}
          />
        ) : (
          <AppIcon
            type="stroke"
            name="bookmarkLight"
            width={42}
            height={42}
            onPress={() => handleSaveButtonPress(isSaved)}
          />
        )}
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
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: color.grey100,
    overflow: 'hidden',
    fontSize: 12,
    fontWeight: '600',
    color: color.grey400,
  },
  title: {
    fontWeight: '600',
    color: color.grey700,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: color.grey400,
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
