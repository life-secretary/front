import {StyleSheet} from 'react-native';
import {getFontSize} from '@/utils/font';

type FontPalette = {
  size: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
};

interface FontSize {
  heading1: number;
  heading2: number;
  heading3: number;
  title1: number;
  title2: number;
  title3: number;
  body1: number;
  body2: number;
  body3: number;
  detail1: number;
  detail2: number;
  detail3: number;
}

type FontWeightValue =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';
interface FontWeight {
  regular: FontWeightValue;
  medium: FontWeightValue;
  semiBold: FontWeightValue;
  bold: FontWeightValue;
}

interface LineHeight {
  heading1: number;
  heading2: number;
  heading3: number;
  title1: number;
  title2: number;
  title3: number;
  body1: number;
  body2: number;
  body3: number;
  detail1: number;
  detail2: number;
  detail3: number;
}

interface LetterSpacing {
  small: number;
  medium: number;
  large: number;
}

export const font: FontPalette = {
  // Font Size
  size: {
    heading1: getFontSize(26),
    heading2: getFontSize(24),
    heading3: getFontSize(20),
    title1: getFontSize(20),
    title2: getFontSize(16),
    title3: getFontSize(15),
    body1: getFontSize(18),
    body2: getFontSize(17),
    body3: getFontSize(16),
    detail1: getFontSize(13),
    detail2: getFontSize(13),
    detail3: getFontSize(12),
  },

  // Font Weight
  fontWeight: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },

  // Font Line Height
  lineHeight: {
    heading1: 36,
    heading2: 29,
    heading3: 24,
    title1: 24,
    title2: 19,
    title3: 18,
    body1: 21,
    body2: 26,
    body3: 19,
    detail1: 16,
    detail2: 16,
    detail3: 14,
  },

  // Font Paragraph Spacing
  // paragraph: {
  //   heading1: 0,
  //   heading2: 8,
  //   heading3: 0,
  //   title1: 4,
  //   title2: 0,
  //   title3: 0,
  //   body1: 0,
  //   body2: 18,
  //   body3: 4,
  //   detail1: 4,
  //   detail2: 4,
  //   detail3: 4,
  // },

  // Font Letter Spacing
  letterSpacing: {
    small: 0,
    medium: -0.2,
    large: -0.5,
  },
};

export const fontStyles = StyleSheet.create({
  heading1: {
    fontSize: font.size.heading1,
    fontWeight: font.fontWeight.semiBold,
    lineHeight: font.lineHeight.heading1,
    letterSpacing: font.letterSpacing.medium,
  },
});
