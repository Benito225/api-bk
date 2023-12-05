import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Guest, GuestSchema } from './entities/guest.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }]),
  ],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule {}
