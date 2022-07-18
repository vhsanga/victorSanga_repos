import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Metrica } from 'src/metricas/entities/metrica.entity';
import { Tribu } from 'src/tribus/entities/tribus.entity';
import { CreateRepositoriesDto } from './dto/create-repositories.dto';
import { RepositoriesDto } from './dto/repositories.dto';
import { UpdateRepositoriesDto } from './dto/update-repositories.dto';
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

  async findOne(id: number) {
    let data = null;
    try {
      data = await this.repoModel.findByPk<Repositories>(id);
    } catch (error) {
      console.log(error);
    }
    return data;
  }

  async findByIdTribu(id_tribu: number) {
    let data = null;
    try {
      data = await this.repoModel.findAll<Repositories>({
        where: {
          id_tribu: id_tribu,
          state: 'E',
        },
        include: [
          {
            model: Metrica,
            required: true,
            //where: { coverage: { [Op.gt]: 75 } },
          },
          { model: Tribu, required: true },
        ],
      });
    } catch (error) {
      console.log(error);
    }
    return data.map((obj) => new RepositoriesDto(obj));
  }

  async update(id_repositorio: number, _updateRepoDto: UpdateRepositoriesDto) {
    const updates = Object.keys(_updateRepoDto);
    const allowedUpdates = ['name', 'status', 'state']; //fields of Organization entity
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
      throw new HttpException(
        'Invalid fields for update.',
        HttpStatus.BAD_REQUEST,
      );
    }
    let repo = null;
    try {
      repo = await this.repoModel.findByPk<Repositories>(id_repositorio);
    } catch (error) {
      console.log(error);
    }
    if (!repo) {
      throw new HttpException('Repository no found.', HttpStatus.NOT_FOUND);
    }

    try {
      const [numberOfAffectedRows, [updatedPost]] = await this.repoModel.update(
        { ..._updateRepoDto },
        { where: { id_repositorio }, returning: true },
      );
      return {
        numberOfAffectedRows,
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: updatedPost,
      };
    } catch (error) {
      throw new HttpException(
        'Repositori could not be update.' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
