import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  getRepositories(@Res() res) {
    const repositories = [
      {
        id: 1,
        state: 604,
      },
      {
        id: 2,
        state: 605,
      },
      {
        id: 3,
        state: 606,
      },
    ];
    return res.status(HttpStatus.OK).json({
      repositories,
    });
  }
}
