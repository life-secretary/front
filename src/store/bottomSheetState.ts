import {atom} from 'recoil';

export const bottomSheetVisibleState = atom({
  key: 'BottomSheetVisibleState',
  default: false,
});

export const bottomSheetModeState = atom({
  key: 'BottomSheetModeState',
  default: '',
});
