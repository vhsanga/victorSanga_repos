import { Column, Model, Table, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import { Tribu } from 'src/tribus/entities/tribus.entity';

@Table({
  tableName: 'organizacion',
})
export class Organizacion extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
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

  @HasMany(() => Tribu)
  tribus: Tribu[];
}
