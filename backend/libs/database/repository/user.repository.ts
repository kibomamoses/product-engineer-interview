import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserSchema } from '../schema/user.db';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(UserSchema.name) private readonly userModel: Model<UserSchema>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserSchema> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll(): Promise<UserSchema[]> {
    return this.userModel.find().exec();
  }

  async findOne(emailAddress: string): Promise<UserSchema> {
    return this.userModel.findOne({ emailAddress }).exec();
  }

  async update(
    emailAddress: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserSchema> {
    return this.userModel
      .findOneAndUpdate({ emailAddress }, updateUserDto, { new: true })
      .exec();
  }

  async delete(emailAddress: string): Promise<UserSchema> {
    return this.userModel.findOneAndDelete({ emailAddress }).exec();
  }
}
