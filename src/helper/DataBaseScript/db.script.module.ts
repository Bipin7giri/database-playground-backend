import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from '../../AllEntites';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
})
export class ScriptModule {}
