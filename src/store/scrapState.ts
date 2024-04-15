import {atom, selector} from 'recoil';

const scrapListState = atom({
  key: 'ScrapListState',
  default: [],
});

const scrapListTotalCountState = selector({
  key: 'ScrapListTotalCountState',
  get: ({get}) => {
    const list = get(scrapListState);

    return list.length;
  },
});

export {scrapListState, scrapListTotalCountState};
