import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../helper/enums/Users.enum';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  position: string;

  @ApiProperty({ enum: Gender, enumName: 'Gender' })
  gender: Gender;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  avatar: any;
}
