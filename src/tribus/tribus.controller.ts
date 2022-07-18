import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { TribusService } from './tribus.service';
import { CreateTribusDto } from './dto/create-tribus.dto';
import { UpdateTribusDto } from './dto/update-tribus.dto';
import { OrganizacionesService } from 'src/organizaciones/organizaciones.service';
import { RepositoriesService } from 'src/repositories/repositories.service';

@Controller('tribus')
export class TribusController {
  constructor(
    private readonly tribusService: TribusService,
    private readonly orgService: OrganizacionesService,
    private readonly repoService: RepositoriesService,
  ) {}

  @Post()
  create(@Body() createTribusDto: CreateTribusDto) {
    return this.tribusService.create(createTribusDto, {});
  }

  @Get()
  findAll() {
    return this.tribusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const tribu = await this.tribusService.findOne(id);
    if (!tribu) {
      throw new HttpException(
        'La Tribu no se encuentra registrada.',
        HttpStatus.NOT_FOUND,
      );
    }
    const organizacion = await this.orgService.findOne(tribu.id_organizacion);
    const repositories = await this.repoService.findByIdTribu(tribu.id_tribu);
    repositories.map((repo) => (repo.organizacion = organizacion.name));
    const noCumplePorcentaje = repositories.every(
      (repo) => repo.coverage <= 75,
    );
    if (noCumplePorcentaje) {
      throw new HttpException(
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
        HttpStatus.OK,
      );
    }
    return { repositories };
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTribusDto: UpdateTribusDto) {
    return this.tribusService.update(id, updateTribusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tribusService.remove(+id);
  }
}
