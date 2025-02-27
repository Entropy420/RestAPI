import { Injectable } from '@nestjs/common';
import { UserInfo } from 'os';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users: usersInter[] = [
    {
      id: 1,
      name: 'Ayush',
      age: 18,
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Rohan',
      age: 18,
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Power',
      age: 18,
      role: 'DEVELOPER',
    },
    {
      id: 4,
      name: 'Entropy',
      age: 18,
      role: 'MANAGER',
    },
  ];

  findAll(role?: 'INTERN' | 'MANAGER' | 'DEVELOPER') {
    if (role) {
      const roleArray = this.users.filter((user) => user.role == role);
      if (!roleArray.length) {
        throw new NotFoundException(`Could not any user with role: ${role}`);
      }
      return roleArray;
    }
    return this.users;
  }

  findId(userId: number) {
    const user = this.users.find((user) => user.id == userId);
    if (!user) {
      throw new NotFoundException(`Did Not Find the User with ID:${userId}`);
    }
  }
  create(createUserDto: CreateUserDto) {
    const highestId = [...this.users].sort((a, b) => b.id - a.id)[0].id;
    const newUser = { id: highestId + 1, ...createUserDto };
    this.users.push(newUser);
    return newUser;
  }

  update(userId: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id == userId) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findId(userId);
  }
  deleteUser(userId: number) {
    // const indexOfUser = this.users.findIndex((user) => user.id == userId);
    // const removedUser = this.users[indexOfUser];
    // this.users.splice(indexOfUser, 1);
    // return removedUser;
    const removedUser = this.findId(userId);
    this.users = this.users.filter((user) => user.id != userId);
    return removedUser;
  }
}
