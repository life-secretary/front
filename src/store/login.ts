import { atom, selector } from 'recoil';

export const userInfoState = atom<UserInfo>({
  key: 'UserInfo',
  default: {
    provider: '',
    providerId: '',
    nickname: '',
    email: '',
    year: '',
    month: '',
    day: '',
    gender: '',
    jobIds: [],
    interests: [],
    married: false,
    hasChild: false,
  },
});

export interface UserInfo {
  provider: string;
  providerId: string;
  nickname: string;
  email: string;
  year: string;
  month: string;
  day: string;
  gender: string;
  jobIds: number[];
  interests: number[];
  married: boolean;
  hasChild: boolean;
}

export interface LoginInfo {
  provider: string;
  idToken: string;
}

export interface Login {
  token: string;
}

export const providerKey = '@providerKey'
// export const idTokenKey = '@idTokenKey'
// export const tokenKey = '@tokenKey'

export const PROVIDERS = {
  KAKAO: 'KAKAO',
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
  NONE: 'NONE'
};