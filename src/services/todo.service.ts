import Database from "src/configs/Database";
import { CreateTodoDto } from "src/dto/todo/create-todo.dto";
import { Todo } from "src/entities";

const todoRepository = Database.instance
  .getDataSource("default")
  .getRepository(Todo);

export const createTodo = async (dto: CreateTodoDto) => {
  const todo = new Todo();
  Object.assign(todo, dto);
  return todoRepository.save(todo);
};

export const getTodos = async (chanel: string, userTargetId?: string) => {
  const query = todoRepository
    .createQueryBuilder("t")
    .andWhere("t.chanel = :id", { id: chanel });
  if (userTargetId) {
    query.andWhere("userTarget = :id", { id: userTargetId });
  }
  query.orderBy("t.createdAt", "ASC");
  const [todos, count] = await query.getManyAndCount();

  return {
    todos,
    count,
  };
};
