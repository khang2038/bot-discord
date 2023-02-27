import Database from "src/configs/Database";
import { CreateTodoDto } from "src/dto/todo/create-todo.dto";
import { Todo } from "src/entities";
import { NotFoundException } from "src/exceptions/not-found.exception";
import { FindOneOptions } from "typeorm";

const todoRepository = Database.instance
  .getDataSource("default")
  .getRepository(Todo);

export const createTodo = async (dto: CreateTodoDto) => {
  const todo = new Todo();
  Object.assign(todo, dto);
  return todoRepository.save(todo);
};

export const getTodos = async (chanel: string, userTargetId: string) => {
  const query = todoRepository
    .createQueryBuilder("t")
    .andWhere("(t.chanel = :id)", { id: chanel })
    .andWhere("(user_target = :target)", { target: userTargetId });
  query.orderBy("t.createdAt", "ASC");
  const [todos, count] = await query.getManyAndCount();

  return {
    todos,
    count,
  };
};

const getOne = (option: FindOneOptions<Todo>) => {
  return todoRepository.findOne(option);
};

export const deleteTodo = async (id: string) => {
  const todo = await getOne({ where: { id: id } });
  if (!todo) {
    throw new NotFoundException("todo");
  }
  return todoRepository.delete(todo.id);
};
