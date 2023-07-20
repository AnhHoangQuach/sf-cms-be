import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Bank {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  index: number;

  @Prop({ default: true })
  isActive: boolean;
}
export type BankDocument = Bank & Document;
export const BankSchema = SchemaFactory.createForClass(Bank);
