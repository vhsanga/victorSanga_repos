import { PartialType } from '@nestjs/mapped-types';
import { CreateTribusDto } from './create-tribus.dto';

export class UpdateTribusDto extends PartialType(CreateTribusDto) {}
