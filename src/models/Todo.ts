type Todo = {
  id: number;
  origId?: number;
  title: string;
  categoryId: number;
  category?: object;
  userTag?: string;
  tagList?: string[];
  isDone: boolean;
  subTodoList?: object[];
  createdTime: string;
  completedTime?: string;
};

export default Todo;
