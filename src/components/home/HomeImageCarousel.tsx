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
  totalSlideCount: number;
  currentSlideIndex: number;
};

function Slide({
  tag,
  title,
  thumbnail,
  totalSlideCount,
  currentSlideIndex,
}: SlideType): React.JSX.Element {
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
        <View style={styles.slideIndicator}>
          <AppText style={[styles.slideIndex, styles.indexText]}>
            {currentSlideIndex}{' '}
            <AppText style={[styles.slash, styles.indexText]}>/</AppText>{' '}
            {totalSlideCount}
          </AppText>
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
  const height = 466;
  const ref = React.useRef<ICarouselInstance>(null);
  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        loop
        width={width}
        height={height}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={3000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={({item, index}) => (
          <Slide
            tag={item.tag}
            title={item.title}
            thumbnail={item.thumbnail}
            totalSlideCount={data.length}
            currentSlideIndex={index + 1}
          />
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
  },
  titleContainer: {
    gap: 14,
    position: 'absolute',
    left: 30,
    bottom: 52,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0B2A4F',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#F2F4F7',
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  slideIndicator: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  indexText: {
    fontSize: 12,
    fontWeight: '500',
  },
  slideIndex: {
    alignItems: 'center',
    color: '#FFFFFF',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#000E2466',
    overflow: 'hidden',
  },
  slash: {
    color: '#FFFFFF66',
  },
});
