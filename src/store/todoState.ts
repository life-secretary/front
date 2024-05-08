import Todo from '@/models/Todo';
import {atom, selector} from 'recoil';

const todoListState = atom({
  key: 'TodoListState',
  default: [],
});

const todoListFilterState = atom({
  key: 'TodoListFilterState',
  default: '진행 중',
});

const filteredTodoListState = selector({
  key: 'FilteredTodoListState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    if (filter === '진행 중') {
      return list.filter((item: Todo) => !item.isDone);
    }

    if (filter === '완료') {
      return list.filter((item: Todo) => item.isDone);
    }
  },
});

const todoListTotalCountState = selector({
  key: 'TodoListTotalCountState',
  get: ({get}) => {
    const filter = get(todoListFilterState);
    const list = get(todoListState);

    if (filter === '진행 중') {
      return list.filter((item: Todo) => !item.isDone).length;
    }

    if (filter === '완료') {
      return list.filter((item: Todo) => item.isDone).length;
    }
  },
});

export {
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListTotalCountState,
};
