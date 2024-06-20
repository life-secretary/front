import {atom} from 'recoil';

type UserInfo = {
  nickname: string;
  birthDate: string;
  jobIds: number[];
  interests: number[];
  gender: string;
  married: boolean;
  hasChild: boolean;
};

const userState = atom<UserInfo | null>({
  key: 'UserState',
  default: {
    nickname: '',
    birthDate: '',
    jobIds: [],
    interests: [],
    gender: '',
    married: false,
    hasChild: false,
  },
});

export {userState};
