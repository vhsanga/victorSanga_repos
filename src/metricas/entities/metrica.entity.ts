import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Repositories } from 'src/repositories/entities/repositories.entity';

@Table({
  tableName: 'metrica',
})
export class Metrica extends Model {
  @PrimaryKey
  @ForeignKey(() => Repositories)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'id_metrica',
  })
  id_metrica;

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  coverage;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bugs;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  vulnerabilities;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  hotspot;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  code_smells;

  @BelongsTo(() => Repositories)
  repositorio: Repositories;
}
