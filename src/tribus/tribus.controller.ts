import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TribusService } from './tribus.service';
import { CreateTribusDto } from './dto/create-tribus.dto';
import { UpdateTribusDto } from './dto/update-tribus.dto';

@Controller('tribus')
export class TribusController {
  constructor(private readonly tribusService: TribusService) {}

  @Post()
  create(@Body() createTribusDto: CreateTribusDto) {
    return this.tribusService.create(createTribusDto, {});
  }

  @Get()
  findAll() {
    return this.tribusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tribusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTribusDto: UpdateTribusDto) {
    return this.tribusService.update(+id, updateTribusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tribusService.remove(+id);
  }
}
