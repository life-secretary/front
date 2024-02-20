import * as React from 'react';
import {StyleSheet, View, Image, ImageSourcePropType} from 'react-native';
import {AppText} from '../../common/AppText';

type ItemProps = {
  title: string;
  category: string;
  thumbnail: ImageSourcePropType;
  date: string;
};

export function HomeContentsItem({
  title,
  category,
  thumbnail,
  date,
}: ItemProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={thumbnail} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.titleContainer}>
          <AppText style={styles.title} isEllipsizeMode={true}>
            {title}
          </AppText>
        </View>
        <View style={styles.row}>
          <AppText style={styles.subTitle}>{category}</AppText>
          <AppText style={styles.subTitle}>|</AppText>
          <AppText style={styles.subTitle}>{date}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  imageContainer: {
    width: 70,
    height: 50,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  infoContainer: {
    flex: 1,
    gap: 10,
    paddingVertical: 4,
  },
  titleContainer: {},
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000E24',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#A1ACB9',
  },
});
