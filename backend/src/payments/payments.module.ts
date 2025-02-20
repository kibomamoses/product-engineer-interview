import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './service/payment.service';
import { PaymentController } from './controllers/payment.controller';
import { Payments, PaymentsSchema } from 'libs/database/schema/payments.db';
import { PaymentsRepository } from 'libs/database/repository/payments.repository';
import { CustomersModule } from '../customers/customers.module';  

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payments.name, schema: PaymentsSchema }]),
    CustomersModule,  
  ],
  controllers: [PaymentController],
  providers: [PaymentService, PaymentsRepository],
  exports: [PaymentService, PaymentsRepository],
})
export class PaymentsModule {}
