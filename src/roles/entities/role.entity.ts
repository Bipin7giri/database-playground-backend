import { User } from '../../AllEntites';
import { SoftDelete } from '../../AllEntites/HelperEntites/SoftDelete.entites';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role extends SoftDelete {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  name: string;

  @Column('text', { array: true })
  roles: string[];

  @OneToMany(() => User, (user) => user.roleId)
  userId: User[];
}
