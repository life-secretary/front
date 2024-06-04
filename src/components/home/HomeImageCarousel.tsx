import React, {useRef, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {categoryListState} from '@/store/categoryState';

import {
  Dimensions,
  ImageBackground,
  View,
  Pressable,
  StyleSheet,
  PanResponder,
} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';
import {AppText} from '@/components/common/AppText';
import spacing from '@/styles/spacing';
import color from '@/styles/color';
import {font} from '@/styles/font';

import {getFontSize} from '@/utils/font';

// TODO: type 재정의 필요
type SlideType = {
  id: string | number;
  tag: string;
  title: string;
  thumbnail: string;
  openContentModal: (data: any) => void;
};

function Slide({
  id,
  tag,
  title,
  thumbnail,
  openContentModal,
}: SlideType): React.JSX.Element {
  console.log(thumbnail);

  const setImageSource = () => {
    const skeletonThumbnail = require('@/assets/images/carouselPlaceholder.jpg');

    if (!thumbnail || thumbnail.includes('null')) {
      return skeletonThumbnail;
    }

    return {uri: thumbnail};
  };

  return (
    <Pressable style={[styles.slide]} onPress={() => openContentModal(id)}>
      <ImageBackground
        source={setImageSource()}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <View style={styles.infoContainer}>
          <View style={styles.tagContainer}>
            <AppText style={styles.tag}>{tag || '카테고리'}</AppText>
          </View>
          <View style={styles.titleContainer}>
            <AppText style={styles.title}>{title}</AppText>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

// TODO: type 재정의 필요
type Props = {
  data: object[];
  openContentModal: (data: any) => void;
};

// TODO: carousel library 교체 필요
export function HomeImageCarousel({
  data,
  openContentModal, // TODO 사용
}: Props): React.JSX.Element {
  const categories = useRecoilValue(categoryListState);
  const [isSwiped, setIsSwiped] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const HORRIZONTAL_PADDING = spacing.layoutPaddingHorizontal * 2;
  const width = Dimensions.get('window').width - HORRIZONTAL_PADDING;
  const height = 466;
  const ref = useRef<ICarouselInstance>(null);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        const {dx, dy} = gestureState;

        // 수평 swipe 감지
        if (Math.abs(dx) > Math.abs(dy)) {
          setIsSwiped(true);
        } else {
          // tap 감지
          setIsSwiped(false);
        }
      },
      onPanResponderMove: (e, gestureState) => {
        const {dx, dy} = gestureState;

        // 수평 swipe 감지
        if (Math.abs(dx) > Math.abs(dy)) {
          setIsSwiped(true);
        } else {
          // tap 감지
          setIsSwiped(false);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        setIsSwiped(false);
      },
    }),
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Carousel
        ref={ref}
        loop
        width={width}
        height={height}
        autoPlay={true}
        autoPlayInterval={8000}
        data={data}
        scrollAnimationDuration={1000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        onSnapToItem={index => {
          setCurrentIndex(index);
        }}
        renderItem={({item}) => {
          return (
            <Pressable
              style={styles.slide}
              onPress={() => {
                if (isSwiped) {
                  return;
                }

                openContentModal();
              }}>
              <Slide
                id={item.id}
                tag={
                  categories.find(cate => cate.id === item?.categoryId)?.title
                }
                title={item?.title}
                thumbnail={item?.imageUrl}
                openContentModal={openContentModal}
              />
            </Pressable>
          );
        }}
      />
      {/* TODO: current index 싱크 맞추기 */}
      <View style={styles.slideIndicator}>
        <AppText style={[styles.slideIndex, styles.indexText]}>
          {currentIndex + 1}{' '}
          <AppText style={[styles.slash, styles.indexText]}>/</AppText>{' '}
          {data.length}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.layoutPaddingHorizontal,
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
  infoContainer: {
    flexWrap: 'wrap',
    marginHorizontal: 30,
    gap: 14,
    position: 'absolute',
    bottom: 52,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    fontSize: getFontSize(13),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 15.51,
    color: color.main.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: color.grey.grey100,
    overflow: 'hidden',
  },
  titleContainer: {},
  title: {
    fontSize: getFontSize(24),
    fontWeight: font.fontWeight.bold,
    lineHeight: 36,
    color: color.main.white,
  },
  slideIndicator: {
    flexDirection: 'row',
    position: 'absolute',
    right: 20,
    bottom: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#000E2466',
    overflow: 'hidden',
  },
  indexText: {
    fontSize: getFontSize(12),
    fontWeight: '500',
  },
  slideIndex: {
    alignItems: 'center',
    color: color.main.white,
  },
  slash: {
    color: '#FFFFFF66',
  },
});
