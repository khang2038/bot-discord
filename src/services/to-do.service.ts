import Database from "src/configs/Database";
import { CreateTodoDto } from "src/dto/to-do/create-todo.dto";
import { Todo } from "src/entities/Todo.entity";

const todoRepository = Database.instance
  .getDataSource("default")
  .getRepository(Todo);

export const createTodo = async (dto: CreateTodoDto) => {
  const todo = new Todo();
  Object.assign(todo, dto);
  return todoRepository.save(todo);
};

export const getTodos = async (userTargetId?: string) => {
  const query = todoRepository.createQueryBuilder("t");
  if (userTargetId) {
    query.andWhere("userTarget = :id", { id: userTargetId });
  }
  query.orderBy("conversation.createdAt", "DESC");
  const [todos, count] = await query.getManyAndCount();

  return {
    todos,
    count,
  };
};
