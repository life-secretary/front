type SubTodo = {
  id: number;
  parentId?: number;
  title: string;
  isDone: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
};

export default SubTodo;
