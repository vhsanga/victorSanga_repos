import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrganizacioneDto } from './dto/create-organizacione.dto';
import { UpdateOrganizacioneDto } from './dto/update-organizacione.dto';
import { Organizacion } from './entities/organizacion.entity';

@Injectable()
export class OrganizacionesService {
  constructor(
    @Inject('OrganizacionRepository')
    private organizacionModel: typeof Organizacion,
  ) {}

  async create(createOrganizacioneDto: CreateOrganizacioneDto, createOption) {
    let organizacion = null;
    try {
      organizacion = await this.organizacionModel.create({
        createOption,
        ...createOrganizacioneDto,
      });
    } catch (error) {
      throw new HttpException(
        'Organization could not be created.' + error.toString(),
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
    let organizaciones = null;
    try {
      organizaciones = await this.organizacionModel.findAll();
    } catch (error) {
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!organizaciones) {
      throw new HttpException('Organizations is empty.', HttpStatus.NOT_FOUND);
    }
    return { statusCode: HttpStatus.OK, message: 'OK', data: organizaciones };
  }

  async findOne(id: number) {
    let organizacion = null;
    try {
      organizacion = await this.organizacionModel.findByPk<Organizacion>(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!organizacion) {
      throw new HttpException('Organization no found.', HttpStatus.NOT_FOUND);
    }
    return organizacion;
  }

  async update(
    id_organizacion: number,
    updateOrganizacioneDto: UpdateOrganizacioneDto,
  ) {
    const updates = Object.keys(updateOrganizacioneDto);
    const allowedUpdates = ['name', 'status']; //fields of Organization entity
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidOperation) {
      throw new HttpException(
        'Invalid fields for update.',
        HttpStatus.BAD_REQUEST,
      );
    }
    let organizacion = null;
    try {
      organizacion = await this.organizacionModel.findByPk<Organizacion>(
        id_organizacion,
      );
    } catch (error) {
      console.log(error);
    }
    if (!organizacion) {
      throw new HttpException('Organization no found.', HttpStatus.NOT_FOUND);
    }

    try {
      const [numberOfAffectedRows, [updatedPost]] =
        await this.organizacionModel.update(
          { ...updateOrganizacioneDto },
          { where: { id_organizacion }, returning: true },
        );
      return {
        numberOfAffectedRows,
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: updatedPost,
      };
    } catch (error) {
      throw new HttpException(
        'Organization could not be update.' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    let organizacion = null;
    try {
      organizacion = await this.organizacionModel.findByPk<Organizacion>(id);
    } catch (error) {
      console.log(error);
    }
    if (!organizacion) {
      throw new HttpException('Organization no found.', HttpStatus.NOT_FOUND);
    }
    try {
      await this.organizacionModel.destroy({ where: { id } });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Organization could not be removed.' + error.toString(),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'OK removed successfully.',
      data: {},
    };
  }
}
