import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Organizacion } from 'src/organizaciones/entities/organizacion.entity';
import { Repositories } from 'src/repositories/entities/repositories.entity';

@Table({
  tableName: 'tribu',
})
export class Tribu extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_tribu;

  @ForeignKey(() => Organizacion)
  @Column({
    type: DataType.INTEGER,
    field: 'id_organizacion',
    allowNull: false,
  })
  id_organizacion;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status: number;

  @BelongsTo(() => Organizacion)
  organizacion: Organizacion;

  @HasMany(() => Repositories)
  repositorios: Repositories[];
}
