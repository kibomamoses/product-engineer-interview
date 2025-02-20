import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { Customer } from '../schema/customer.db'; 

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectModel(Customer.name) 
    private readonly customerModel: Model<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const newCustomer = new this.customerModel(createCustomerDto);
    return newCustomer.save();
  }

  async findAll(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async findOne(customerId: string): Promise<Customer> {
    return this.customerModel.findOne({ _id: customerId }).exec();
  }
  
  async update(
    customerId: string,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerModel
      .findOneAndUpdate({ _id: customerId }, updateCustomerDto, { new: true })
      .exec();
  }

  async delete(customerId: string): Promise<Customer> {
    return this.customerModel.findOneAndDelete({ _id: customerId }).exec();
  }
}
