import {atom, selector} from 'recoil';

import type {CategoryObject} from '../models/common';

const categoryListState = atom({
  key: 'CategoryListState',
  default: [],
});

const mainCategoryListState = selector({
  key: 'MainCategoryListState',
  get: ({get}) => {
    const categories = get(categoryListState);
    let list: CategoryObject[] = [];

    // 메인 카테고리 리스트 순서 보장
    categories.map((item: CategoryObject) => {
      if (item?.category === 'economy') {
        list[0] = item;
      }

      if (item?.category === 'law') {
        list[1] = item;
      }

      if (item?.category === 'environment') {
        list[2] = item;
      }

      if (item?.category === 'selfImprovement') {
        list[3] = item;
      }

      if (item?.category === 'health') {
        list[4] = item;
      }

      if (item?.category === 'culture') {
        list[5] = item;
      }

      if (item?.category === 'etc') {
        list[6] = item;
      }
    });

    return list;
  },
});

const homeCategoryListState = selector({
  key: 'HomeCategoryListState',
  get: ({get}) => {
    const categories = get(mainCategoryListState);

    return [{id: 0, category: 'all', title: '전체'}, ...categories];
  },
});

const surveyCategoryListState = selector({
  key: 'SurveyCategoryListState',
  get: ({get}) => {
    const categories = get(categoryListState);
    const convertedCategories = categories.map((item: CategoryObject) => {
      return {
        ...item,
        id: String(item.id),
        selected: false,
      };
    });

    return [
      ...convertedCategories,
      // { title: '상관없음', id: '', selected: false }
    ];
  },
});

export {
  categoryListState,
  mainCategoryListState,
  homeCategoryListState,
  surveyCategoryListState,
};
