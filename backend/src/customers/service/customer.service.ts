import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'libs/database/dto/create-customer.dto';
import { CustomerRepository } from 'libs/database/repository/customer.repository';
import { CustomerSchema } from 'libs/database/schema/customer.db';

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async getAllCustomers(): Promise<CustomerSchema[]> {
    try {
      const customers = await this.customerRepository.findAll();
      return customers;
    } catch (error) {
      throw error;
    }
  }

  async createCustomer(dto: CreateCustomerDto): Promise<CustomerSchema> {
    try {
      const customers = await this.customerRepository.create(dto);
      return customers;
    } catch (error) {
      throw error;
    }
  }
}
