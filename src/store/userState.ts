import {atom} from 'recoil';

type UserInfo = {
  nickname: string;
  ageRange: 'TEEN' | 'YOUTH' | 'ADULT' | 'SENIOR' | null;
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
    ageRange: null,
    jobIds: [],
    interests: [],
    gender: '',
    married: false,
    hasChild: false,
  },
});

export {userState};
