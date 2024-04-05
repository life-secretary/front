import React from 'react';

import {
  Dimensions,
  ImageBackground,
  ImageRequireSource,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {AppText} from '@/components/common/AppText';
import spacing from '@/styles/spacing';
import color from '@/styles/color';
import {font} from '@/styles/font';

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
  openContentModal: () => void;
};

export function HomeImageCarousel({
  data,
  openContentModal,
}: CarouselType): React.JSX.Element {
  const HORRIZONTAL_PADDING = spacing.layoutPaddingHorizontal * 2;
  const width = Dimensions.get('window').width - HORRIZONTAL_PADDING;
  const height = 466;
  const ref = React.useRef<ICarouselInstance>(null);
  return (
    <Pressable style={styles.container} onPress={openContentModal}>
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
            tag={item?.tag}
            title={item?.title}
            thumbnail={item?.thumbnail}
            totalSlideCount={data.length}
            currentSlideIndex={index + 1}
          />
        )}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
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
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 15.51,
    color: color.main.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: color.grey.grey100,
    overflow: 'hidden',
  },
  title: {
    fontSize: 24,
    fontWeight: font.fontWeight.bold,
    lineHeight: 36,
    color: color.main.white,
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
    color: color.main.white,
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
