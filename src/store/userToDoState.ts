import { atom } from 'recoil';

const userToDoState = atom({
    key: 'UserToDoState',
    default: [],
});

export { userToDoState };