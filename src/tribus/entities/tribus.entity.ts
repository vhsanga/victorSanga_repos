import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Organizacion } from 'src/organizaciones/entities/organizacion.entity';

@Table({
  tableName: 'tribu',
})
export class Tribu extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Organizacion)
  @Column({
    type: DataType.INTEGER,
    field: 'id_organizacion',
  })
  id_organizacion: number;

  @Column
  name: string;

  @Column
  status: number;

  @BelongsTo(() => Organizacion)
  organizacion: Organizacion;
}
