import * as React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageRequireSource,
  StyleSheet,
  View,
} from 'react-native';
import {AppText} from '../common/AppText';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

// TODO: type 재정의 필요
type SlideType = {
  tag: string;
  title: string;
  thumbnail: ImageRequireSource;
};

function Slide({tag, title, thumbnail}: SlideType): React.JSX.Element {
  return (
    <View style={[styles.slide]}>
      <ImageBackground
        source={thumbnail}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.titleContainer}>
          {/* TODO: Tag 컴포넌트화 */}
          <View style={styles.tagContainer}>
            <AppText style={styles.tag}>{tag}</AppText>
          </View>
          <AppText style={styles.title}>{title}</AppText>
        </View>
      </ImageBackground>
    </View>
  );
}

// TODO: type 재정의 필요
type CarouselType = {
  data: object[];
};

// TODO: slide index bar 추가 필요
export function HomeImageCarousel({data}: CarouselType): React.JSX.Element {
  // TODO: 추후 상수 값으로 대체
  const HORRIZONTAL_PADDING = 24 * 2;
  const width = Dimensions.get('window').width - HORRIZONTAL_PADDING;
  const ref = React.useRef<ICarouselInstance>(null);

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        loop
        width={width}
        height={450}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={3000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={({item}) => (
          <Slide tag={item.tag} title={item.title} thumbnail={item.thumbnail} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden',
  },
  slide: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    position: 'relative',
  },
  titleContainer: {
    top: 304,
    left: 30,
    gap: 14,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    backgroundColor: '#F2F4F7',
    fontSize: 13,
    fontWeight: '600',
    color: '#0B2A4F',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
