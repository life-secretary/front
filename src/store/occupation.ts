import { atom, selector } from 'recoil';

import type { OccupationObject } from '@/models/common';

const occupationListState = atom({
    key: 'OccupationListState',
    default: [],
});

const surveyOccupationListState = selector({
    key: 'SurveyOccupationListState',
    get: ({ get }) => {
        const occupations: Array<OccupationObject> = get(occupationListState);

        return occupations
            .map((item) => {
                return {
                    ...item,
                    id: item.id,
                    selected: false,
                }
            })
            .concat({
                title: '해당 없음', 
                id: -1, 
                selected: false,
            });
    },
})

export {
    occupationListState,
    surveyOccupationListState,
}