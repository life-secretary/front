import React from 'react';

import {StyleSheet} from 'react-native';
import AppButton from '@/components/common/AppButton';
import color from '@/styles/color';
import {font} from '@/styles/font';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {homeContentFilterState} from '@/store/homeContentState';

import {getFontSize} from '@/utils/font';

type Props = {style?: any, type: string};

export function ViewMoreButton({style, type}: Props): React.JSX.Element {
  const navigation: any = useNavigation();
  const homeContentFilter = useRecoilValue(homeContentFilterState);

  const handlePress = () => {
    switch(type) {
      // 유사한 사용자 콘텐츠 (임시)
      case 'similar':
        navigation.navigate('SearchCategoryModal', {
          selectedCategory: {id: 0, category: 'all', title: '전체'},
          selectedSort: 'viewCount,desc',
        });
      break;
      // 인기 많은 콘텐츠
      case 'popular': 
        navigation.navigate('SearchCategoryModal', {
          selectedCategory: homeContentFilter,
          selectedSort: 'scrapCount,desc',
        });
      break;
      // 최근 업데이트 콘텐츠
      case 'recent':
        navigation.navigate('SearchCategoryModal', {
          selectedCategory: {id: 0, category: 'all', title: '전체'},
          selectedSort: 'createdAt,desc',
        });
      break;
      default:

    }
  };

  return (
    <AppButton
      style={style}
      text="더보기"
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      endIcon={{
        name: 'angleRight',
        width: 24,
        height: 24,
      }}
      onPressButton={handlePress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
    paddingVertical: 15,
    borderRadius: 10,
    gap: 4,
    backgroundColor: color.grey.grey100,
  },
  buttonText: {
    fontSize: getFontSize(15),
    fontWeight: font.fontWeight.semiBold,
    lineHeight: 17.9,
    color: color.main.primary,
  },
});
