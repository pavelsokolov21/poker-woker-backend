import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop({
    unique: true,
  })
  userId: string;

  @Prop()
  refreshToken: string;

  @Prop()
  expirationDate: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
