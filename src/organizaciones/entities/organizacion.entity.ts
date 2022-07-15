import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Organizacion extends Model {
  @Column
  name: string;

  @Column
  status: number;
}
