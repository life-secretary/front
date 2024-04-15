import {atom} from 'recoil';

const FAKE_USER = {
  id: 1,
  email: 'hongkildong@gmail.com',
  nickname: '홍길동',
  birthdate: '2000-01-01',
  gender: 'M',
  married: false,
  hasChild: false,
};

const userInfoState = atom({
  key: 'UserState',
  default: FAKE_USER,
});

export {userInfoState};
