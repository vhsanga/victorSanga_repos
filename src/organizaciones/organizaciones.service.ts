import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizacioneDto } from './dto/create-organizacione.dto';
import { UpdateOrganizacioneDto } from './dto/update-organizacione.dto';
import { Organizacion } from './entities/organizacion.entity';

@Injectable()
export class OrganizacionesService {
  constructor(
    @Inject('OrganizacionRepository')
    private organizacionModel: typeof Organizacion,
  ) {}

  create(createOrganizacioneDto: CreateOrganizacioneDto) {
    return 'This action adds a new organizacione';
  }

  findAll() {
    return this.organizacionModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} organizacione`;
  }

  update(id: number, updateOrganizacioneDto: UpdateOrganizacioneDto) {
    return `This action updates a #${id} organizacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizacione`;
  }
}
