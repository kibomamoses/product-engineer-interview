import { Injectable } from '@nestjs/common';
import { UserRepository } from 'libs/database/repository/user.repository';
import { UserSchema } from 'libs/database/schema/user.db';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers(): Promise<UserSchema[]> {
    try {
      const users = await this.userRepository.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }
}
