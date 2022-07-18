import { Repositories } from './entities/repositories.entity';

export const repoProvider = [
  {
    provide: 'RepositoriesRepository',
    useValue: Repositories,
  },
];
