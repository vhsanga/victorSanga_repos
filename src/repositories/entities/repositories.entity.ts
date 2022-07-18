import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, HasMany,  HasOne,  Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Metrica } from 'src/metricas/entities/metrica.entity';
import { Tribu } from 'src/tribus/entities/tribus.entity';

@Table({
  tableName: 'repositorio',
})
export class Repositories extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_repositorio;

  @ForeignKey(() => Tribu)
  @Column({
    type: DataType.INTEGER,
    field: 'id_tribu',
    allowNull: false,
  })
  id_tribu;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  name;

  @Column({
    type: DataType.STRING(1),
    allowNull: false,
  })
  state;

  @Column({
    type: DataType.STRING(1),
    allowNull: false,
  })
  status;

  @BelongsTo(() => Tribu)
  tribu: Tribu;

  @HasOne(() => Metrica)
  tribus: Metrica;
}
