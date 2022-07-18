import { Metrica } from './entities/metrica.entity';

export const metricaProvider = [
  {
    provide: 'MetricaRepository',
    useValue: Metrica,
  },
];
