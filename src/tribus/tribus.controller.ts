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
  Response,
  StreamableFile,
} from '@nestjs/common';
import { TribusService } from './tribus.service';
import { CreateTribusDto } from './dto/create-tribus.dto';
import { UpdateTribusDto } from './dto/update-tribus.dto';
import { OrganizacionesService } from 'src/organizaciones/organizaciones.service';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { convertArrayToCSV } from 'convert-array-to-csv';
import converter from 'convert-array-to-csv';
import * as fs from 'fs';
import { promisify } from 'util';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('tribus')
export class TribusController {
  constructor(
    private readonly tribusService: TribusService,
    private readonly orgService: OrganizacionesService,
    private readonly repoService: RepositoriesService,
  ) { }

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

  @Get('csv/:id')
  async findOneCsv(
    @Response({ passthrough: true }) res,
    @Param('id') id: number,
  ) {
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
    const csvFromArrayOfObjects = convertArrayToCSV(repositories);
    const fileName = 'temp.csv';
    const writeFile = promisify(fs.writeFile);
    await writeFile(`${fileName}`, csvFromArrayOfObjects, 'utf8');
    const file = createReadStream(join(process.cwd(), fileName));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="repositories.csv"',
    });
    return new StreamableFile(file);
  }

  checkIfFileOrDirectoryExists = async (path: string): Promise<boolean> => {
    return await fs.existsSync(path);
  };

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTribusDto: UpdateTribusDto) {
    return this.tribusService.update(id, updateTribusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tribusService.remove(+id);
  }
}
