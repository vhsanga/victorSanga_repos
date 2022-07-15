import { Module } from '@nestjs/common';
import { TribusService } from './tribus.service';
import { TribusController } from './tribus.controller';
import { Tribu } from './entities/tribus.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Tribu])],
  controllers: [TribusController],
  providers: [TribusService],
})
export class TribusModule {}
