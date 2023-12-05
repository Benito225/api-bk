import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { Guest, GuestSchema } from '../../modules/guest/entities/guest.entity';
import { GuestSeeder } from '../../modules/guest/guest.seeder';

seeder({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([{ name: Guest.name, schema: GuestSchema }]),
  ],
}).run([GuestSeeder]);
