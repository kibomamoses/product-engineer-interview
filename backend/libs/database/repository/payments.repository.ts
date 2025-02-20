import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentsDto } from '../dto/create-payments.dto';
import { UpdatePaymentsDto } from '../dto/update-payments.dto';
import { Payments} from '../schema/payments.db';

@Injectable()
export class PaymentsRepository {
  constructor(
    @InjectModel(Payments.name)
    private readonly paymentsModel: Model<Payments>,
  ) {}

  async create(createPaymentsDto: CreatePaymentsDto): Promise<Payments> {
    const newPayment = new this.paymentsModel(createPaymentsDto);
    return newPayment.save();
  }

  async findAll(): Promise<Payments[]> {
    return this.paymentsModel.find().populate('customer').exec();
  }

  async findOne(paymentId: string): Promise<Payments> {
    return this.paymentsModel.findById(paymentId).populate('customer').exec();
  }

  async update(paymentId: string, updateData: Partial<UpdatePaymentsDto>): Promise<Payments> {
    return this.paymentsModel
      .findByIdAndUpdate(paymentId, updateData, { new: true })
      .populate('customer')
      .exec();
  }

  async delete(paymentId: string): Promise<Payments> {
    return this.paymentsModel.findByIdAndDelete(paymentId).exec();
  }
}
