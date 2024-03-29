import { User } from '../../users/entities/user.entity';
import { SoftDelete } from '../../../AllEntites/HelperEntites/SoftDelete.entites';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCredential extends SoftDelete {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.roleId)
  userId: User;
}
