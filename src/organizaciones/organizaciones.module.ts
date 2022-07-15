import { Module } from '@nestjs/common';
import { OrganizacionesService } from './organizaciones.service';
import { OrganizacionesController } from './organizaciones.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Organizacion } from './entities/organizacion.entity';

@Module({
  imports: [SequelizeModule.forFeature([Organizacion])],
  controllers: [OrganizacionesController],
  providers: [OrganizacionesService],
})
export class OrganizacionesModule {}
