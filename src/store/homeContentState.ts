import {atom} from 'recoil';

export const homeContentListState = atom({
  key: 'HomeContentListState',
  default: [],
});

export const homeContentFilterState = atom({
  key: 'HomeContentFilterState',
  default: {id: 0, category: 'all', title: '전체'},
});

export const filteredHomeContentListState = atom({
  key: 'FilteredHomeContentListState',
  default: [],
});

export const newestHomeContentListState = atom({
  key: 'NewestHomeContentListState',
  default: [],
});

export const homeCarouselContentListState = atom({
  key: 'HomeCarouselContentListState',
  default: [],
});

export const homeContentListReadBySimilarUsersState = atom({
  key: 'HomeContentListReadBySimilarUsersState',
  default: [],
});
