import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'libs/database/dto/create-user.dto';
import { UserRepository } from 'libs/database/repository/user.repository';
import { User, validatePassword } from 'libs/database/schema/user.db';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    emailAddress: string,
    password: string,
  ): Promise<Record<any, any>> {
    try {
      const user = await this.userRepository.findOne(emailAddress);
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const passwordMatch = await validatePassword(password, user.password);
      if (passwordMatch) {
        const accessPayload = {
          sub: user.id,
          ...user,
        };

        const accessToken = this.jwtService.sign(accessPayload, {
          expiresIn: '60m',
        });

        return {
          accessToken,
          user,
        };
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    } catch (error) {
      throw error;
    }
  }

  async register(
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
  ): Promise<User | undefined> {
    try {
      const dto = new CreateUserDto();
      dto.firstName = firstName;
      dto.lastName = lastName;
      dto.emailAddress = emailAddress;
      dto.password = password;
      const user = await this.userRepository.create(dto);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
