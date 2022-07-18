import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CreateRepositoriesDto } from './dto/create-repositories.dto';
import { UpdateRepositoriesDto } from './dto/update-repositories.dto';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get('mock')
  getRepositories(@Res() res) {
    const repositories = [
      {
        id: 1,
        state: 604,
      },
      {
        id: 2,
        state: 605,
      },
      {
        id: 3,
        state: 606,
      },
    ];
    return res.status(HttpStatus.OK).json({
      repositories,
    });
  }

  @Post()
  create(@Body() createTribusDto: CreateRepositoriesDto) {
    return this.repositoriesService.create(createTribusDto, {});
  }

  @Get()
  findAll() {
    return this.repositoriesService.findAll();
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateOrganizacioneDto: UpdateRepositoriesDto,
  ) {
    return this.repositoriesService.update(id, updateOrganizacioneDto);
  }
}
