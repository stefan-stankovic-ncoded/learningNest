import { Role } from 'src/decorators/roles.decorator';
import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  @Generated('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ enum: [Role] })
  role: Role;
}
