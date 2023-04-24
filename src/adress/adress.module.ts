import { Module } from '@nestjs/common';
import { AdressController } from './adress.controller';
import { AdressService } from './adress.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressEntity } from './entities/adress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  controllers: [AdressController],
  providers: [AdressService],
})
export class AdressModule {}