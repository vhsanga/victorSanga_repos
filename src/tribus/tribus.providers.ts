import { Tribu } from './entities/tribus.entity';

export const tribuProvider = [
  {
    provide: 'TribuRepository',
    useValue: Tribu,
  },
];
