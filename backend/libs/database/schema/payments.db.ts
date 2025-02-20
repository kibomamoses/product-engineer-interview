import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'payments',
})
export class Payments extends Document {
  @Prop({ required: true, unique: true })
  referenceId: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'Customer' })
  customer: Types.ObjectId;

  @Prop({ default: 0 })
  version: number;

  createdAt: Date;
  updatedAt: Date;
}

export const PaymentsSchema = SchemaFactory.createForClass(Payments);
