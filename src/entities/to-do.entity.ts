
import { BaseEntity } from 'src/shares/base.entity';
import { Entity } from 'typeorm';
@Entity('todo')
export class Todo extends BaseEntity {
    task: string;
    description: string;
    userTarget: string;
    ownerTarget: string;
    status: string;
}