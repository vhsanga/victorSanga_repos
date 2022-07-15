import { Organizacion } from './entities/organizacion.entity';

export const organizacionProvider = [
  {
    provide: 'OrganizacionRepository',
    useValue: Organizacion,
  },
];
