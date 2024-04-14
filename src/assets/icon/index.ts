import React from 'react';
import {SvgProps} from 'react-native-svg';

import {default as addCircle} from './icon_add_circle.svg';
import {default as addDark} from './icon_add_dark.svg';
import {default as addLight} from './icon_add_light.svg';
import {default as angleDown} from './icon_angle_down.svg';
import {default as angleUp} from './icon_angle_up.svg';
import {default as arrowDown} from './icon_arrow_down.svg';
import {default as arrowLeft} from './icon_arrow_left.svg';
import {default as arrowRight} from './icon_arrow_right.svg';
import {default as arrowUp} from './icon_arrow_up.svg';
import {default as back} from './icon_back.svg';
import {default as balancer} from './icon_balancer.svg';
import {default as bookmarkLarge} from './icon_bookmark_large.svg';
import {default as bookmarkMedium} from './icon_bookmark_medium.svg';
import {default as checkBoxCircle} from './icon_checkbox_circle.svg';
import {default as checkboxSquare} from './icon_checkbox_square.svg';
import {default as closeDark} from './icon_close_dark.svg';
import {default as closeFillDark} from './icon_close_fill_dark.svg';
import {default as closeFillLight} from './icon_close_fill_light.svg';
import {default as closeLight} from './icon_close_light.svg';
import {default as edit} from './icon_edit.svg';
import {default as hamburger} from './icon_hamburger.svg';
import {default as meatball} from './icon_meatball.svg';
import {default as notificationOff} from './icon_notification_off.svg';
import {default as notificationOn} from './icon_notification_on.svg';
import {default as reload} from './icon_reload.svg';
import {default as search} from './icon_search.svg';
import {default as setting} from './icon_setting.svg';
import {default as trash} from './icon_trash.svg';
import {default as upload} from './icon_upload.svg';
import {default as logo} from './icon_logo.svg';
import {default as all} from './category/icon_category_all.svg';
import {default as economy} from './category/icon_category_economy.svg';
import {default as law} from './category/icon_category_law.svg';
import {default as environment} from './category/icon_category_environment.svg';
import {default as selfImprovement} from './category/icon_category_selfimprovement.svg';
import {default as health} from './category/icon_category_health.svg';
import {default as culture} from './category/icon_category_culture.svg';
import {default as etc} from './category/icon_category_etc.svg';
import {default as select} from './icon_select.svg';
import {default as logoKakao} from './login/icon_kakao.svg';
import {default as logoGoogle} from './login/icon_google.svg';
import {default as logoApple} from './login/icon_apple.svg';
import {default as warning} from './icon_warning.svg';

// TODO: iconName 키 타입 string -> string literal 변경하기
export type IconsData = {
  [iconName: string]: {
    type: 'stroke' | 'fill';
    file: React.FC<SvgProps> | string;
    defaultStroke: string;
    defaultFill: string;
  };
};

const Icons: IconsData = {
  addCircle: {
    type: 'stroke',
    file: addCircle,
    defaultStroke: '#526070',
    defaultFill: '',
  },
  // BUG: addDark & addLight 분명 같은 아이콘인데 묘하게 다름,,
  addDark: {
    type: 'stroke',
    file: addDark,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  addLight: {
    type: 'stroke',
    file: addLight,
    defaultStroke: '#A1ACB9',
    defaultFill: '',
  },
  angleDown: {
    type: 'stroke',
    file: angleDown,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  angleUp: {
    type: 'stroke',
    file: angleUp,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  // arrow icon dark color : #000E24
  // arrow icon light color: #A1ACB9
  arrowDown: {
    type: 'stroke',
    file: arrowDown,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  arrowLeft: {
    type: 'stroke',
    file: arrowLeft,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  arrowRight: {
    type: 'stroke',
    file: arrowRight,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  arrowUp: {
    type: 'stroke',
    file: arrowUp,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  back: {
    type: 'stroke',
    file: back,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  balancer: {
    type: 'stroke',
    file: balancer,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  bookmarkLarge: {
    type: 'fill',
    file: bookmarkLarge,
    defaultStroke: '#000E24',
    defaultFill: '#FFFFFF',
  },
  bookmarkMedium: {
    type: 'fill',
    file: bookmarkMedium,
    defaultStroke: '#A1ACB9',
    defaultFill: '#FFFFFF',
  },
  checkBoxCircle: {
    type: 'fill',
    file: checkBoxCircle,
    defaultStroke: '#526070',
    defaultFill: '#FFFFFF',
  },
  checkboxSquare: {
    type: 'fill',
    file: checkboxSquare,
    defaultStroke: '#0B2A4F',
    defaultFill: '#FFFFFF',
  },
  closeDark: {
    type: 'stroke',
    file: closeDark,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  closeFillDark: {
    type: 'fill',
    file: closeFillDark,
    defaultStroke: '#526070',
    defaultFill: '#CBD3DC',
  },
  closeFillLight: {
    type: 'fill',
    file: closeFillLight,
    defaultStroke: '#A1ACB9',
    defaultFill: '#E7EDF3',
  },
  closeLight: {
    type: 'stroke',
    file: closeLight,
    defaultStroke: '#A1ACB9',
    defaultFill: '',
  },
  edit: {
    type: 'stroke',
    file: edit,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  hamburger: {
    type: 'stroke',
    file: hamburger,
    defaultStroke: '#CBD3DC',
    defaultFill: '',
  },
  meatball: {
    type: 'fill',
    file: meatball,
    defaultStroke: '#FFFFFF',
    defaultFill: '#FFFFFF',
  },
  notificationOff: {
    type: 'stroke',
    file: notificationOff,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  notificationOn: {
    type: 'stroke',
    file: notificationOn,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  reload: {
    type: 'stroke',
    file: reload,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  search: {
    type: 'stroke',
    file: search,
    defaultStroke: '#0B2A4F',
    defaultFill: '',
  },
  setting: {
    type: 'stroke',
    file: setting,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  trash: {
    type: 'stroke',
    file: trash,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  upload: {
    type: 'stroke',
    file: upload,
    defaultStroke: '#000E24',
    defaultFill: '',
  },
  logo: {
    type: 'fill',
    file: logo,
    defaultStroke: '#0B2A4F',
    defaultFill: '#0B2A4F',
  },
  all: {
    type: 'fill',
    file: all,
    defaultStroke: '',
    defaultFill: '',
  },
  economy: {
    type: 'fill',
    file: economy,
    defaultStroke: '',
    defaultFill: '',
  },
  law: {
    type: 'fill',
    file: law,
    defaultStroke: '',
    defaultFill: '',
  },
  environment: {
    type: 'fill',
    file: environment,
    defaultStroke: '',
    defaultFill: '',
  },
  selfImprovement: {
    type: 'fill',
    file: selfImprovement,
    defaultStroke: '',
    defaultFill: '',
  },
  health: {
    type: 'fill',
    file: health,
    defaultStroke: '',
    defaultFill: '',
  },
  culture: {
    type: 'fill',
    file: culture,
    defaultStroke: '',
    defaultFill: '',
  },
  etc: {
    type: 'fill',
    file: etc,
    defaultStroke: '',
    defaultFill: '',
  },
  select: {
    type: 'fill',
    file: select,
    defaultStroke: '',
    defaultFill: '#F2F4F7',
  },
  logoKakao: {
    type: 'fill',
    file: logoKakao,
    defaultStroke: '',
    defaultFill: '',
  },
  logoGoogle: {
    type: 'fill',
    file: logoGoogle,
    defaultStroke: '',
    defaultFill: '',
  },
  logoApple: {
    type: 'fill',
    file: logoApple,
    defaultStroke: '',
    defaultFill: '',
  },
  warning: {
    type: 'stroke',
    file: warning,
    defaultStroke: '',
    defaultFill: '',
  },
};

export default Icons;
