import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedExpiresType1610650829691 implements MigrationInterface {
  name = 'FixedExpiresType1610650829691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens"
          DROP COLUMN "expires"`
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens"
          ADD "expires" TIMESTAMP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens"
          DROP COLUMN "expires"`
    );
    await queryRunner.query(
      `ALTER TABLE "refresh_tokens"
          ADD "expires" text NOT NULL`
    );
  }
}
