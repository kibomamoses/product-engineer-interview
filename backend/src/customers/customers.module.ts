import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';  
import { Customer, CustomerSchema } from 'libs/database/schema/customer.db';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './service/customer.service';
import { CustomerRepository } from 'libs/database/repository/customer.repository';

@Module({
  imports: [
    ConfigModule, 
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    JwtModule.registerAsync({ 
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
  exports: [CustomerService, CustomerRepository, JwtModule],
})
export class CustomersModule {}
