import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../src/payments/service/payment.service';
import { PaymentsRepository } from 'libs/database/repository/payments.repository';
import { CustomerRepository } from 'libs/database/repository/customer.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentsRepository: Partial<PaymentsRepository>;
  let customerRepository: Partial<CustomerRepository>;

  beforeEach(async () => {
    paymentsRepository = {
      findOne: jest.fn(),
    };
    customerRepository = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        { provide: PaymentsRepository, useValue: paymentsRepository },
        { provide: CustomerRepository, useValue: customerRepository },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should reassign payment successfully', async () => {
    paymentsRepository.findOne = jest.fn().mockResolvedValue({
      _id: 'paymentId',
      customer: 'sourceCustomerId',
      save: jest.fn().mockResolvedValue(true),
    });

    customerRepository.findOne = jest.fn().mockResolvedValue({ _id: 'targetCustomerId' });

    await expect(
      service.reassignPayment({
        paymentId: 'paymentId',
        sourceCustomerId: 'sourceCustomerId',
        targetCustomerId: 'targetCustomerId',
      })
    ).resolves.not.toThrow();
  });

  it('should throw an error if payment does not exist', async () => {
    paymentsRepository.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      service.reassignPayment({
        paymentId: 'invalidId',
        sourceCustomerId: 'sourceCustomerId',
        targetCustomerId: 'targetCustomerId',
      })
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if target customer does not exist', async () => {
    paymentsRepository.findOne = jest.fn().mockResolvedValue({
      _id: 'paymentId',
      customer: 'sourceCustomerId',
    });

    customerRepository.findOne = jest.fn().mockResolvedValue(null);

    await expect(
      service.reassignPayment({
        paymentId: 'paymentId',
        sourceCustomerId: 'sourceCustomerId',
        targetCustomerId: 'invalidId',
      })
    ).rejects.toThrow(NotFoundException);
  });
});
