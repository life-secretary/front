import { atom } from 'recoil';

type RecentSearchWord = {
    id: number;
    title: string;
};

type PopularSearchWord = {
    searchCount: number;
    searchText: string;
};

const recentSearchWordState = atom<Array<RecentSearchWord>>({
    key: 'RecentSearchWordState',
    default: [],
});

const popularSearchWordState = atom<Array<PopularSearchWord>>({
    key: 'PopularSearchWordState',
    default: [],
});

export {
    recentSearchWordState,
    popularSearchWordState,
};

export type {
    RecentSearchWord,
    PopularSearchWord,
}