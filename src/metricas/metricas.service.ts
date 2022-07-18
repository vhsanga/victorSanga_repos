import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateMetricaDto } from './dto/create-metrica.dto';
import { UpdateMetricaDto } from './dto/update-metrica.dto';
import { Metrica } from './entities/metrica.entity';

@Injectable()
export class MetricasService {
  constructor(
    @Inject('MetricaRepository')
    private metricaModel: typeof Metrica,
  ) {}

  async create(createTribuDto: CreateMetricaDto, createOption) {
    let organizacion = null;
    try {
      organizacion = await this.metricaModel.create({
        createOption,
        ...createTribuDto,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Metrica could not be created. ' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'OK - created successfully',
      data: organizacion,
    };
  }

  async findAll() {
    let metricas = null;
    try {
      metricas = await this.metricaModel.findAll();
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!metricas) {
      throw new HttpException('Organizations is empty.', HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, message: 'OK', data: metricas };
  }

  async update(id_metrica: number, _updateMetricaDto: UpdateMetricaDto) {
    const updates = Object.keys(_updateMetricaDto);
    const allowedUpdates = [
      'coverage',
      'bugs',
      'vulnerabilities',
      'hotspot',
      'code_smells',
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
      throw new HttpException(
        'Invalid fields for update.',
        HttpStatus.BAD_REQUEST,
      );
    }
    let metrica = null;
    try {
      metrica = await this.metricaModel.findByPk<Metrica>(id_metrica);
    } catch (error) {
      console.log(error);
    }
    if (!metrica) {
      throw new HttpException('Metrica no found.', HttpStatus.NOT_FOUND);
    }

    try {
      const [numberOfAffectedRows, [updatedPost]] =
        await this.metricaModel.update(
          { ..._updateMetricaDto },
          { where: { id_metrica }, returning: true },
        );
      return {
        numberOfAffectedRows,
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: updatedPost,
      };
    } catch (error) {
      throw new HttpException(
        'Metrica could not be update.' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} metrica`;
  }

  remove(id: number) {
    return `This action removes a #${id} metrica`;
  }
}
