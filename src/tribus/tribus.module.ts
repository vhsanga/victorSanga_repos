import { Module } from '@nestjs/common';
import { TribusService } from './tribus.service';
import { TribusController } from './tribus.controller';
import { Tribu } from './entities/tribus.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrganizacionesModule } from 'src/organizaciones/organizaciones.module';
import { RepositoriesModule } from 'src/repositories/repositories.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Tribu]),
    OrganizacionesModule,
    RepositoriesModule,
  ],
  controllers: [TribusController],
  providers: [TribusService],
})
export class TribusModule {}
