import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Products')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  comment: string;
}
