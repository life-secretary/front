import {atom} from 'recoil';

export const homeContentsListState = atom({
  key: 'HomeContentsListState',
  default: [],
});

export const homeContentsFilterState = atom({
  key: 'HomeContentsFilterState',
  default: {},
});

export const filteredHomeContentsListState = atom({
  key: 'FilteredHomeContentsListState',
  default: [],
});

export const newestHomeContentsListState = atom({
  key: 'NewestHomeContentsListState',
  default: [],
});
