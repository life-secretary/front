import { atom, selector } from 'recoil';

export const userInfoState = atom({
    key: 'UserInfo',
    default: {
        provider: '',
        providerId: '',
        nickname: '',
        year: '',
        month: '',
        day: '',
        birthDate: '',
        gender: '',
        jobIds: [''],
        interests: [''],
        married: false,
        hasChild: false,
    },
});