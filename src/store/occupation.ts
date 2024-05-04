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
                    id: String(item.id),
                    selected: false,
                }
            })
            .concat({
                title: '해당 없음', 
                id: '', 
                selected: false,
            });
    },
})

export {
    occupationListState,
    surveyOccupationListState,
}