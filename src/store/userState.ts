import {atom, selector} from 'recoil';

type UserInfo = {
  nickname: string;
  birthDate: string;
  occupations: number[];
  interests: number[];
  gender: string;
  hasMarried: boolean;
  hasChild: boolean;
};

const userState = atom<UserInfo | null>({
  key: 'UserState',
  default: {
    nickname: '',
    birthDate: '',
    occupations: [],
    interests: [],
    gender: '',
    hasMarried: false,
    hasChild: false,
  },
});

export {userState};
