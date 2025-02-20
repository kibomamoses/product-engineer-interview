import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerRepository } from '../repository/customer.repository';
import { PaymentsRepository } from '../repository/payments.repository';
import { UserRepository } from '../repository/user.repository';
import { PaymentsSchema } from '../schema/payments.db';
import { CustomerSchema } from '../schema/customer.db';
import { UserSchema } from '../schema/user.db';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Payments', schema: PaymentsSchema },
      { name: 'Customer', schema: CustomerSchema }, 
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [CustomerRepository, PaymentsRepository, UserRepository],
  exports: [CustomerRepository, PaymentsRepository, UserRepository], 
})
export class DatabaseModule {}
