import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity('user')
export class User {
  @ObjectIdColumn() // Mapea "id" a "_id" en la base de datos
  @PrimaryColumn()
  id: ObjectId;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;
}
