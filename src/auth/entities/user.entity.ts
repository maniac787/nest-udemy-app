import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn() // Mapea "id" a "_id" en la base de datos
  _id: ObjectId;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
