import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @ApiProperty({
    example: '3b1f0787-8b77-445d-a8c3-1984564d0197',
  })
  @PrimaryColumn({
    type: 'uuid',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @ApiProperty({
    example: 'somerandomuser',
  })
  @Column({
    type: 'text',
  })
  @Index({
    unique: true,
  })
  username: string;

  @ApiProperty({
    example: '2021-01-01T00:00:00.000Z',
  })
  @Column({
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  created_at: Date;
}
