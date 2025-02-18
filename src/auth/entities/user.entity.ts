import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('user')
export class User {
  @ObjectIdColumn({ name: '_id' }) // Mapea "id" a "_id" en la base de datos
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
