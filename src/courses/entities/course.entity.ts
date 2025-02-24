import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Course {
  @ObjectIdColumn()
  _id: ObjectId | undefined;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  coverImage: string;
}
