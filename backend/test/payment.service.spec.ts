import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from '../src/payments/service/payment.service';
import { PaymentsRepository } from 'libs/database/repository/payments.repository';
import { CustomerRepository } from 'libs/database/repository/customer.repository';
import { NotFoundException } from '@nestjs/common';

describe('PaymentService', () => {
  let service: PaymentService;
  let paymentsRepository: Partial<PaymentsRepository>;
  let customerRepository: Partial<CustomerRepository>;

  beforeEach(async () => {
    paymentsRepository = {
      findOne: jest.fn(),
      update: jest.fn(),
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

  // Test case for a successful reassignment of the payment
  it('should reassign payment successfully', async () => {
    // Mock a payment object
    const mockPayment = { _id: 'paymentId', customer: 'sourceCustomerId' } as any;
    // Mock the behavior of 'findOne' for the payment to return a mock payment
    paymentsRepository.findOne = jest.fn().mockResolvedValue(mockPayment);
    // Mock the behavior of 'findOne' for the source and target customers
    customerRepository.findOne = jest.fn()
      .mockResolvedValueOnce({ _id: 'sourceCustomerId' }) // Source customer exists
      .mockResolvedValueOnce({ _id: 'targetCustomerId' }); // Target customer exists

    // Mock 'update' to return the updated payment with new customer ID
    paymentsRepository.update = jest.fn().mockResolvedValue({ ...mockPayment, customer: 'targetCustomerId' });

    // Call the service method to reassign payment
    const result = await service.reassignPayment({
      paymentId: 'paymentId',
      sourceCustomerId: 'sourceCustomerId',
      targetCustomerId: 'targetCustomerId',
    });

    // Assert that the payment's customer ID has been updated to the target customer ID
    expect(result.customer).toBe('targetCustomerId');
  });

  // Test case for when the payment doesn't exist
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

  // Test case for when the target customer doesn't exist
  it('should throw an error if target customer does not exist', async () => {
    paymentsRepository.findOne = jest.fn().mockResolvedValue({
      _id: 'paymentId',
      customer: 'sourceCustomerId',
    });
    customerRepository.findOne = jest.fn().mockResolvedValueOnce(null); // Target customer not found

    await expect(
      service.reassignPayment({
        paymentId: 'paymentId',
        sourceCustomerId: 'sourceCustomerId',
        targetCustomerId: 'invalidId',
      })
    ).rejects.toThrow(NotFoundException);
  });

  // Test case for when the source customer doesn't exist
  it('should throw an error if source customer does not exist', async () => {
    paymentsRepository.findOne = jest.fn().mockResolvedValue({
      _id: 'paymentId',
      customer: 'sourceCustomerId',
    });
    customerRepository.findOne = jest.fn().mockResolvedValueOnce(null); // Source customer not found

    await expect(
      service.reassignPayment({
        paymentId: 'paymentId',
        sourceCustomerId: 'invalidSourceCustomerId',
        targetCustomerId: 'targetCustomerId',
      })
    ).rejects.toThrow(NotFoundException);
  });
});
