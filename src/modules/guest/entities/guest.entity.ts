import { BaseSchema } from '../../../common/shared/base-schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Guest extends BaseSchema {
  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ default: false })
  mairie: boolean;

  @Prop({ default: false })
  eglise: boolean;

  @Prop({ default: false })
  reception: boolean;
}

export const GuestSchema = SchemaFactory.createForClass(Guest);
