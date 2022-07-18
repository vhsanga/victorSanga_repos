import { Module } from '@nestjs/common';
import { MetricasService } from './metricas.service';
import { MetricasController } from './metricas.controller';
import { Metrica } from './entities/metrica.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Metrica])],
  controllers: [MetricasController],
  providers: [MetricasService],
})
export class MetricasModule {}
