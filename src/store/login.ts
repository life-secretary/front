import { atom, selector } from 'recoil';

export const userInfoState = atom({
    key: 'UserInfo',
    default: {
        // "provider": "KAKAO/GOOGLE/APPLE/NONE",
        // "providerId": "3441101649",
        // "_email": "string",
        // "nickname": "string",
        // "birthDate": "1990-12-11",
        // "gender": "M",
        // "jobIds": [
        //     0
        // ],
        // "interests": [
        //     0
        // ],
        // "married": true,
        // "hasChild": true,
        // "email": "string"

        provider: '',
        providerId: '',
        nickname: '',
        year: '',
        month: '',
        day: '',
        // birthDate: '',
        gender: '',
        jobIds: [''],
        interests: [''],
        married: false,
        hasChild: false,
    },
});