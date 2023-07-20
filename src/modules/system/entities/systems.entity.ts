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
export class System {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  teleLink: string;

  @Prop()
  zaloLink: string;

  @Prop()
  siteUrl: string;

  @Prop()
  qrCode: string;

  @Prop()
  phone: string;

  @Prop({ default: true })
  isActive: boolean;
}
export type SystemDocument = System & Document;
export const SystemSchema = SchemaFactory.createForClass(System);
