import React from 'react';
import {useRecoilValue} from 'recoil';
import {categoryListState} from '@/store/categoryState';

import {StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {AppText} from '@/components/common/AppText';
import {BookmarkButton} from './BookmarkButton';

import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFontSize} from '@/utils/font';

type Props = {
  content: object;
  mode: string;
  checkedList: object[];
  handleButtonPress: Function;
  handleCheckedList: Function;
};

export function ScrapContentItem({
  content,
  mode,
  handleCheckedList,
}: Props): React.JSX.Element {
  const categories = useRecoilValue(categoryListState);
  const handleCheckboxPress = (action: string, data: object) => {
    handleCheckedList(action, data);
  };

  return (
    <View style={styles.container}>
      {(mode === 'EDIT' || mode === 'DELETE') && (
        <View style={styles.checkboxContainer}>
          <BouncyCheckbox
            size={18}
            fillColor={color.grey.grey500}
            iconStyle={styles.checkbox}
            disableText
            onPress={(checked: boolean) => {
              checked
                ? handleCheckboxPress('push', content)
                : handleCheckboxPress('remove', content);
            }}
          />
        </View>
      )}
      <View style={styles.itemContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.tagContainer}>
            <AppText style={styles.tag}>
              {
                categories.find(category => category.id === content.categoryId)
                  ?.title
              }
            </AppText>
          </View>
          <AppText style={styles.title} isEllipsizeMode={true}>
            {content?.title}
          </AppText>
        </View>
        {mode === 'READ' && <BookmarkButton contents={content} />}
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
    backgroundColor: color.grey.grey100,
    overflow: 'hidden',
    fontSize: getFontSize(12),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 14.32,
    color: color.grey.grey400,
  },
  title: {
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 19.09,
    letterSpacing: font.letterSpacing.medium,
    color: color.grey.grey700,
  },
  checkboxContainer: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    borderWidth: 1.5,
    borderColor: color.grey.grey500,
  },
});
