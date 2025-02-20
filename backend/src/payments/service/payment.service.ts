import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PaymentsRepository } from 'libs/database/repository/payments.repository';
import { Payments } from 'libs/database/schema/payments.db';
import { ReassignPaymentDto } from 'libs/database/dto/reassign-payment.dto';
import { CustomerRepository } from 'libs/database/repository/customer.repository';
import { CreatePaymentsDto } from 'libs/database/dto/create-payments.dto';
import { CustomerSchema } from 'libs/database/schema/customer.db';

@Injectable()
export class PaymentService {
  constructor(
    private readonly paymentsRepository: PaymentsRepository,
    private readonly customerRepository: CustomerRepository,
  ) {}

  async getAllPayments(): Promise<Payments[]> {
    return this.paymentsRepository.findAll();
  }

  async createPayment(dto: CreatePaymentsDto): Promise<Payments> {
    return this.paymentsRepository.create(dto);
  }

  async reassignPayment(dto: ReassignPaymentDto): Promise<Payments> {
    try {
      const { paymentId, sourceCustomerId, targetCustomerId } = dto;
  
      //Ensure payment exists
      const payment = await this.paymentsRepository.findOne(paymentId);
      if (!payment) {
        throw new NotFoundException('Payment not found');
      }
  
      // Ensure source customer exists
      const sourceCustomer = await this.customerRepository.findOne(sourceCustomerId);
      if (!sourceCustomer) {
        throw new NotFoundException('Source customer not found');
      }
  
      //Ensure target customer exists
      const targetCustomer = await this.customerRepository.findOne(targetCustomerId);
      if (!targetCustomer) {
        throw new NotFoundException('Target customer not found');
      }
  
      // Assign only the target customer's ID, not the full object
      payment.customer = targetCustomer._id as any;
      // Explicitly cast `_id` to string and only update the required fields
       const updatedPayment = await this.paymentsRepository.update(payment._id.toString(), {
  customer: payment.customer, 
});

      return updatedPayment;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}