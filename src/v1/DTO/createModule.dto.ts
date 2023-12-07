import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

enum PostgresDataTypes {
  SERIAL = 'serial',
  INTEGER = 'integer',
  BIGINT = 'bigint',
  SMALLINT = 'smallint',
  DECIMAL = 'decimal',
  NUMERIC = 'numeric',
  REAL = 'real',
  DOUBLE = 'double precision',
  CHAR = 'char',
  VARCHAR = 'varchar',
  TEXT = 'text',
  BYTEA = 'bytea',
  TIMESTAMP = 'timestamp',
  TIMESTAMPTZ = 'timestamptz',
  DATE = 'date',
  TIME = 'time',
  TIMETZ = 'timetz',
  BOOLEAN = 'boolean',
  UUID = 'uuid',
  JSON = 'json',
  JSONB = 'jsonb',
  ARRAY = 'array',
  ENUM = 'enum',
}
export class TableDetails {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  columnName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PostgresDataTypes)
  dataType: PostgresDataTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isOptional: boolean;
}

export class CreateModuleDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @ValidateNested()
  @IsArray()
  tableDetails: TableDetails[];
}
