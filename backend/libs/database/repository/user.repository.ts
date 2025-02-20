import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schema/user.db';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(emailAddress: string): Promise<User> {
    return this.userModel.findOne({ emailAddress }).exec();
  }

  async update(
    emailAddress: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userModel
      .findOneAndUpdate({ emailAddress }, updateUserDto, { new: true })
      .exec();
  }

  async delete(emailAddress: string): Promise<User> {
    return this.userModel.findOneAndDelete({ emailAddress }).exec();
  }
}
