import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageSourcePropType,
  Pressable,
} from 'react-native';
import {AppText} from '../common/AppText';

type ItemProps = {
  category: string;
  title: string;
  thumbnail: ImageSourcePropType;
};

const handlePress: any = (item: string) => {
  console.log(item);
};

export function HomeCategoryItem({
  category,
  title,
  thumbnail,
}: ItemProps): React.JSX.Element {
  return (
    <Pressable style={styles.container} onPress={handlePress(category)}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={thumbnail} />
      </View>
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
