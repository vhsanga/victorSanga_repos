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
    return this.organizacionModel.create({
      createOption,
      ...createOrganizacioneDto,
    });
  }

  async findAll() {
    return this.organizacionModel.findAll();
  }

  async findOne(id: string) {
    const organizacion = await this.organizacionModel.findByPk<Organizacion>(
      id,
    );
    if (!organizacion) {
      throw new HttpException('Organization no found.', HttpStatus.NOT_FOUND);
    }
    return organizacion;
  }

  async update(id: string, updateOrganizacioneDto: UpdateOrganizacioneDto) {
    const organizacion = await this.organizacionModel.findByPk<Organizacion>(
      id,
    );
    if (!organizacion) {
      throw new HttpException('Organization no found.', HttpStatus.NOT_FOUND);
    }
    const [numberOfAffectedRows, [updatedPost]] =
      await this.organizacionModel.update(
        { ...updateOrganizacioneDto },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }

  async remove(id: string) {
    const organizacion = await this.organizacionModel.findByPk<Organizacion>(
      id,
    );
    if (!organizacion) {
      throw new HttpException('Organization no found.', HttpStatus.NOT_FOUND);
    }
    return await this.organizacionModel.destroy({ where: { id } });
  }
}
