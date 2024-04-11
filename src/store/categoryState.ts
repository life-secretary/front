import {atom, selector} from 'recoil';

const categoryListState = atom({
  key: 'CategoryListState',
  default: [],
});

const mainCategoryListState = selector({
  key: 'MainCategoryListState',
  get: ({get}) => {
    const categories = get(categoryListState);
    let list: object[] = [];

    // 메인 카테고리 리스트 순서 보장
    categories.map((item: object) => {
      if (item?.category === 'economy') {
        list[0] = item;
      }

      if (item?.category === 'law') {
        list[1] = item;
      }

      if (item?.category === 'environment') {
        list[2] = item;
      }

      if (item?.category === 'self-improvement') {
        list[3] = item;
      }

      if (item?.category === 'health') {
        list[4] = item;
      }

      if (item?.category === 'culture') {
        list[5] = item;
      }
    });

    return list;
  },
});

export {categoryListState, mainCategoryListState};
