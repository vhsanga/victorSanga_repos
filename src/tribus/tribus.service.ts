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
    let tribu = null;
    try {
      tribu = await this.tribuModel.create({
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
      data: tribu,
    };
  }

  async findAll() {
    let tribus = null;
    try {
      tribus = await this.tribuModel.findAll();
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!tribus) {
      throw new HttpException('Organizations is empty.', HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, message: 'OK', data: tribus };
  }

  async findOne(id: number) {
    let data = null;
    try {
      data = await this.tribuModel.findByPk<Tribu>(id);
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return data;
  }

  update(id: number, updateTribusDto: UpdateTribusDto) {
    return `This action updates a #${id} tribus`;
  }

  remove(id: number) {
    return `This action removes a #${id} tribus`;
  }
}
