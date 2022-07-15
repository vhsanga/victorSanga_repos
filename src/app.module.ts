import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoriesModule } from './repositories/repositories.module';
import { OrganizacionesModule } from './organizaciones/organizaciones.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { TribusModule } from './tribus/tribus.module';

@Module({
  imports: [
    RepositoriesModule,
    OrganizacionesModule,
    SequelizeModule.forRoot({
      uri: 'postgresql://vhsanga:ZaLgEUkQmSjR8DRzADSWVQ@free-tier14.aws-us-east-1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dmythic-ape-3519',
      autoLoadModels: true,
      synchronize: true,
    }),
    TribusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
