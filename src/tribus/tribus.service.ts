import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTribusDto } from './dto/create-tribus.dto';
import { UpdateTribusDto } from './dto/update-tribus.dto';
import { Tribu } from './entities/tribus.entity';

@Injectable()
export class TribusService {
  constructor(
    @Inject('TribuRepository')
    private tribuModel: typeof Tribu,
  ) {}

  async create(createTribuDto: CreateTribusDto, createOption) {
    let organizacion = null;
    try {
      organizacion = await this.tribuModel.create({
        createOption,
        ...createTribuDto,
      });
    } catch (error) {
      throw new HttpException(
        'Tribu could not be created.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK - created successfully',
      data: organizacion,
    };
  }

  findAll() {
    return this.tribuModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} tribus`;
  }

  update(id: number, updateTribusDto: UpdateTribusDto) {
    return `This action updates a #${id} tribus`;
  }

  remove(id: number) {
    return `This action removes a #${id} tribus`;
  }
}
