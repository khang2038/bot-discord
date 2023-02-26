import { EToDo } from "src/interfaces/todo.interface";
import { BaseEntity } from "src/shares/base.entity";
import { Column, Entity } from "typeorm";
@Entity("todo")
export class Todo extends BaseEntity {
  @Column()
  title: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  user_target: string;
  @Column()
  owner: string;
  @Column({ enum: EToDo, default: EToDo.INCOMPLETE })
  status: string;
  @Column({ nullable: true })
  chanel: string;
}
