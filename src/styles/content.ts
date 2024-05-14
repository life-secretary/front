import { getFontSize } from "@/utils/font";

export const markdownStyle = () => {
    return {
        body: {
          paddingHorizontal: 24,
          marginBottom: 18,
        },
        image: {
          marginBottom: 18,
        },
        heading1: {
          fontWeight: '600',
          fontSize: getFontSize(18),
          lineHeight: 21,
          color: '#000E24',
          marginBottom: 18,
        },
        heading2: {
          fontWeight: '600',
          fontSize: getFontSize(18),
          lineHeight: 21,
          color: '#000E24',
          marginBottom: 18,
        },
        heading4: {
          fontWeight: '400',
          fontSize: getFontSize(17),
          lineHeight: 26,
          color: '#40474F',
          marginBottom: 18,
        },
        heading5: {
          fontWeight: '400',
          fontSize: getFontSize(17),
          lineHeight: 26,
          color: '#40474F',
          marginBottom: 18,
        },
        heading6: {
          fontWeight: '400',
          fontSize: getFontSize(17),
          lineHeight: 26,
          color: '#40474F',
          marginBottom: 18,
        },
        strong: {
          fontWeight: '600',
          fontSize: getFontSize(17),
          lineHeight: 26,
          color: '#000E24',
          marginBottom: 18,
        },
        bullet_list: {
          fontWeight: '400',
          fontSize: getFontSize(17),
          lineHeight: 26,
          color: '#40474F',
          marginVertical: 18,
          gap: 5,
        },
        ordered_list: {
          fontWeight: '400',
          fontSize: getFontSize(17),
          lineHeight: 26,
          color: '#40474F',
          marginVertical: 18,
          gap: 5,
        }
      };
};