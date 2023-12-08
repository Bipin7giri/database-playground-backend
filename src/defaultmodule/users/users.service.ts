import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Role } from '../../AllEntites';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from '../../helper/hash.services';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';
import { UserCredential } from './entities/UserCredential.entities';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserCredential)
    private readonly userCredential: Repository<UserCredential>,
    private hashService: HashService
  ) {}

  public findAll(query: PaginateQuery): Promise<Paginated<User>> {
    return paginate(query, this.userRepository, {
      sortableColumns: ['id', 'username', 'email'],
      relations: ['roleId'],
      nullSort: 'last',
      searchableColumns: ['username'],
      defaultSortBy: [['id', 'DESC']],
      // filterableColumns: {
      //   : [FilterOperator.GTE, FilterOperator.LTE],
      // },
    });
  }

  async registerUser(createUserDto: CreateUserDto) {
    try {
      const hashPassword = await this.hashService.hashPassword(createUserDto.password);
      const roles = await this.roleRepository.findOne({
        where: {
          name: 'user',
        },
      });
      const userCredentialId: any = await this.userCredential.save({
        password: hashPassword,
      });
      const response = await this.userRepository.save({
        userCredentialId: userCredentialId,
        roles: roles,
        email: createUserDto.email,
      });
      return 'user registred';
    } catch (err) {
      throw new UnprocessableEntityException('email must be unique');
    }
  }

  getUserByEmail(param) {
    return this.userRepository.findOne(param.email);
  }

  async findOne(email: string) {

    const data = await this.userRepository.findOne({
      where: { email: email },
      relations: {
        userCredentialId: true,
        roleId: true,
      },
    });
    return data;
  }

  async blockUserById(id: number) {
    try {
      const checkIfUserExist = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (checkIfUserExist) {
        return this.userRepository.update(id, {
          isBlocked: true,
        });
      } else {
        return null;
      }
    } catch (err) {}
  }

  findUsersById(id: number) {
    return this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  pathUserById(id: number, payload: UpdateUserDto) {
    return this.userRepository.update(id, payload);
  }

  // create a new user by admin
  async createUser(createUserDto: CreateUserDto, avatarUrl: string): Promise<string> {
    const roleId = await this.roleRepository.findOne({
      where: {
        name: 'employee',
      },
    });
    const hashPassword: string = await this.hashService.hashPassword(createUserDto.password);
    const userCredentialId: UserCredential = await this.userCredential.save({
      password: hashPassword,
    });
    const checkIfEmailAlreadyexist: User = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (checkIfEmailAlreadyexist) {
      throw new UnprocessableEntityException('Email already exist');
    }
    await this.userRepository.save({
      userCredentialId: userCredentialId,
      fullName: createUserDto.fullName,
      gender: createUserDto.gender,
      location: createUserDto.location,
      email: createUserDto.email,
      roleId: roleId,
      avatar: avatarUrl,
    });
    return 'User created';
  }

  async scriptDb() {
    const countIfuser = await this.roleRepository.count();
    if (countIfuser === 0) {
      const roles: any = await this.roleRepository.save({
        name: 'admin',
        roles: ['admin'],
      });
      await this.roleRepository.save({
        name: 'users',
        roles: ['user'],
      });
      const userCredentialId = await this.userCredential.save({
        password: '$2a$12$DzW7DBrHUTYFRie7ycF8ouIubkmsrKzNcZs2bZ6mtWpY4FDYoTwhm',
      });
      const adminCreated = await this.userRepository.save({
        fullName: 'admin',
        email: 'admin@example.com',
        roleId: roles,
        userCredentialId: userCredentialId,
      });
      return adminCreated;
    } else {
      throw new UnprocessableEntityException('Admin alreay exist');
    }
  }
}
