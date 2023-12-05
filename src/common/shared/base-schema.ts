import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class BaseSchema extends Document {
  @Prop()
  created_by: string;

  @Prop()
  updated_by: string;

  @Prop()
  deleted_by: string;

  @Prop()
  deleted_at: Date;
}
