import * as React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {AppText} from '../common/AppText';
import AppIcon from '../common/AppIcon';

type ItemProps = {
  category: string;
  title: string;
};

const handlePress: any = (item: string) => {
  console.log(item);
};

export function HomeCategoryItem({
  category,
  title,
}: ItemProps): React.JSX.Element {
  return (
    <Pressable style={styles.container} onPress={handlePress(category)}>
      <AppIcon type="stroke" name={category} width={44} height={44} />
      <AppText style={styles.text}>{title}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  imageContainer: {
    width: 44,
    height: 44,
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },

  text: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 5,
  },
});
