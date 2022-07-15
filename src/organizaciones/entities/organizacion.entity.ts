import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import { Tribu } from 'src/tribus/entities/tribus.entity';

@Table({
  tableName: 'organizacion',
})
export class Organizacion extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id_organizacion: number;

  @Column
  name: string;

  @Column
  status: number;

  @HasMany(() => Tribu)
  posts: Tribu[];
}
