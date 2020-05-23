// eslint-disable-next-line no-unused-vars
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addavatarFieldToUsers1588468708467
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }
}
