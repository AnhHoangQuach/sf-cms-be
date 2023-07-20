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
export class Banner {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  index: number;

  @Prop({ default: true })
  isActive: boolean;
}
export type BannerDocument = Banner & Document;
export const BannerSchema = SchemaFactory.createForClass(Banner);
