type ColorPalette = {
  main: MainColor;
  grey: GreyColor;
  state: StateColor;
  shadow: ShadowColor;
};

interface MainColor {
  black: string;
  white: string;
  primary: string;
  secondary: string;
}

interface GreyColor {
  grey100: string;
  grey200: string;
  grey300: string;
  grey400: string;
  grey500: string;
  grey600: string;
  grey700: string;
}

interface StateColor {
  notice: string;
  error: string;
}

interface ShadowColor {
  box: string;
}

const color: ColorPalette = {
  // Main Colors
  main: {
    black: '#000000',
    white: '#FFFFFF',
    primary: '#0B2A4F',
    secondary: '#4681F6',
  },

  // Grey Colors
  grey: {
    grey100: '#F2F4F7',
    grey200: '#E7EDF3',
    grey300: '#CBD3DC',
    grey400: '#A1ACB9',
    grey500: '#526070',
    grey600: '#40474F',
    grey700: '#000E24',
  },

  // State Colors
  state: {
    notice: '#44A554',
    error: '#E44848',
  },

  // Shadow Colors
  shadow: {
    box: '#CBD3DC80',
  },
};

export default color;
