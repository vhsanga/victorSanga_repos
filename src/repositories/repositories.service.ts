import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateRepositoriesDto } from './dto/create-repositories.dto';
import { Repositories } from './entities/repositories.entity';

@Injectable()
export class RepositoriesService {
  constructor(
    @Inject('RepositoriesRepository')
    private repoModel: typeof Repositories,
  ) {}

  async create(createTribuDto: CreateRepositoriesDto, createOption) {
    let organizacion = null;
    try {
      organizacion = await this.repoModel.create({
        createOption,
        ...createTribuDto,
      });
    } catch (error) {
      throw new HttpException(
        'Tribu could not be created.' + error.toString(),
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
    let repos = null;
    try {
      repos = await this.repoModel.findAll();
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!repos) {
      throw new HttpException('Organizations is empty.', HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, message: 'OK', data: repos };
  }
}
