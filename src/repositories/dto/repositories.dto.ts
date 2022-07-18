import { ApiProperty } from '@nestjs/swagger';
import { Repositories } from '../entities/repositories.entity';

export class RepositoriesDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly state: string;

  @ApiProperty()
  readonly coverage: string;

  @ApiProperty()
  readonly codeSmells: number;

  @ApiProperty()
  readonly bugs: number;

  @ApiProperty()
  readonly vulnerabilities: number;

  @ApiProperty()
  readonly hotspots: number;

  @ApiProperty()
  readonly tribe: string;

  @ApiProperty()
  readonly organization: string;

  constructor(repo: Repositories) {
    this.id = repo.id_repositorio;
    this.name = repo.name;
    this.coverage = repo.metrica.coverage;
    this.codeSmells = repo.metrica.code_smells;
    this.bugs = repo.metrica.bugs;
    this.vulnerabilities = repo.metrica.vulnerabilities;
    this.hotspots = repo.metrica.hotspot;
    this.state = repo.state;
    this.tribe = repo.tribu.name;
    //this.organization = repo.tribu.organizacion.name;
  }
}
