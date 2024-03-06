import * as React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {AppText} from '../common/AppText';
import Carousel from 'react-native-reanimated-carousel';

export function HomeImageCarousel(): React.JSX.Element {
  const HORRIZONTAL_PADDING = 24 * 2;
  const width = Dimensions.get('window').width - HORRIZONTAL_PADDING;

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={450}
        autoPlay={true}
        data={[...new Array(4).keys()]}
        scrollAnimationDuration={2000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}>
            <AppText style={{textAlign: 'center', fontSize: 30}}>
              {index}
            </AppText>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
