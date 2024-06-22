import {removeToken, setToken} from '@/api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {atom} from 'recoil';

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

export const loginInfoState = atom<LoginInfo>({
  key: 'LoginInfo',
  default: {
    provider: '',
    idToken: '',
  },
});
interface LoginInfo {
  provider: string;
  idToken: string;
}

export const providerKey = '@providerKey';
export const refreshTokenKey = '@refreshTokenKey';
export const lastNoticeIdKey = '@lastNoticeIdKey';

export const setLastNoticeId = async (noticeId: number) => {
  try {
    await AsyncStorage.setItem(lastNoticeIdKey, noticeId.toString());
    // console.log('Saved successfully:', noticeId);
  } catch (error) {
    console.error('Error on saving', error);
  }
};

export const getLastNoticeId = async () => {
  try {
    const noticeId = await AsyncStorage.getItem(lastNoticeIdKey);
    if (noticeId !== null) {
      // console.log('retrieved successfully:', noticeId);
      return parseInt(noticeId, 10);
    } else {
      console.log('Not found');
      return 0;
    }
  } catch (error) {
    console.error('Error on retrieving', error);
    return null;
  }
};

export const setTokens = async (accessToken: string, refreshToken: string) => {
  try {
    setToken(accessToken);
    await AsyncStorage.setItem(refreshTokenKey, refreshToken);
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
};

export const getRefreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem(refreshTokenKey);
    if (refreshToken !== null) {
      // console.log('Refresh token retrieved successfully:', refreshToken);
      return refreshToken;
    } else {
      console.log('No refresh token found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

const removeRefreshToken = async () => {
  try {
    await AsyncStorage.removeItem(refreshTokenKey);
    console.log('All tokens removed successfully');
  } catch (error) {
    console.error('Error removing tokens:', error);
  }
};

export async function clearAuth() {
  try {
    removeToken();
    await removeRefreshToken();
    await AsyncStorage.removeItem(providerKey);
  } catch (error) {
    console.error('Error remove tokens:', error);
  }
}

export const PROVIDERS = {
  KAKAO: 'KAKAO',
  GOOGLE: 'GOOGLE',
  APPLE: 'APPLE',
  NONE: 'NONE',
};
