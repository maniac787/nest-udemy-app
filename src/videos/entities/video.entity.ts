import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Video {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  src: string;
}
