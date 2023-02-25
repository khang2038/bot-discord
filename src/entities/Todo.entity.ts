import { EToDo } from "src/types/todo";
import { BaseEntity } from "src/shares/base.entity";
import { Column, Entity } from "typeorm";
@Entity("todo")
export class Todo extends BaseEntity {
  @Column()
  title: string;
  @Column({ nullable: true })
  description: string;
  @Column()
  userTarget: string;
  @Column()
  owner: string;
  @Column({ enum: EToDo, default: EToDo.INCOMPLETE })
  status: string;
}
