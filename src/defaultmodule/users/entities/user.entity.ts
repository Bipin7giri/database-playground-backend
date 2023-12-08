import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../../AllEntites';
import { SoftDelete } from '../../../AllEntites/HelperEntites/SoftDelete.entites';
import { UserCredential } from './UserCredential.entities';
import { Gender } from '../../../helper/enums/Users.enum';

@Entity()
export class User extends SoftDelete {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({ nullable: true })
  fullName: string;

  @ApiProperty()
  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Other })
  gender: Gender;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  isBlocked: boolean;

  @ManyToOne(() => Role, (role) => role.userId)
  @JoinColumn({ name: 'role_id' })
  roleId: Role;

  @OneToOne(() => UserCredential, (uc) => uc.userId)
  @JoinColumn({ name: 'user_credential_id' })
  userCredentialId: UserCredential;
}
