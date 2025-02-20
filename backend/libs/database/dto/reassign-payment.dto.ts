import { IsString, IsNotEmpty } from 'class-validator';

export class ReassignPaymentDto {
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @IsString()
  @IsNotEmpty()
  sourceCustomerId: string;

  @IsString()
  @IsNotEmpty()
  targetCustomerId: string;
}
