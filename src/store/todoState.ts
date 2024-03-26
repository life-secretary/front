import {generateRandomId} from '../utils';
import {atom} from 'recoil';

const DUMMY_TODO = [
  {
    id: generateRandomId(),
    title: '나의 미래 준비, 어떻게 시작할까요?',
    field: {key: 'ECONOMY', text: '경제'},
    tags: ['경제'],
    subTodoList: [
      {id: '11', title: '노후 예상 비용 계산하기', isCompleted: false},
      {id: '12', title: '월 저축액 계획하기', isCompleted: false},
    ],
    createdDate: '2024.01.01',
    isCompleted: false,
  },
  {
    id: generateRandomId(),
    title: '사용자가 입력한 할 일 제목 1',
    field: {key: 'HEALTH', text: '건강'},
    tags: ['나의 할 일', '건강'],
    subTodoList: [{id: '21', title: '2024 건강검진 하기', isCompleted: false}],
    createdDate: '2024.01.10',
    isCompleted: false,
  },
  {
    id: generateRandomId(),
    title: '사용자가 입력한 할 일 제목 2',
    field: {key: 'SELFDEV', text: '자기계발'},
    tags: ['나의 할 일', '자기계발'],
    subTodoList: [
      {id: '31', title: '자격증 취득', isCompleted: false},
      {id: '32', title: '토익 900점 이상', isCompleted: false},
    ],
    createdDate: '2024.01.01',
    isCompleted: true,
  },
  {
    id: generateRandomId(),
    title: '사용자가 입력한 할 일 제목 3',
    field: {key: 'SELFDEV', text: '자기계발'},
    tags: ['나의 할 일', '자기계발'],
    subTodoList: [],
    createdDate: '2024.01.31',
    isCompleted: false,
  },
];

export const todoListState = atom({
  key: 'todoListState',
  default: DUMMY_TODO,
});
