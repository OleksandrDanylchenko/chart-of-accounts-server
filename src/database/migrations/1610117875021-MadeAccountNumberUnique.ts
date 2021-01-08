import { MigrationInterface, QueryRunner } from 'typeorm';

export class MadeAccountNumberUnique1610117875021
  implements MigrationInterface {
  name = 'MadeAccountNumberUnique1610117875021';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "accounts"."number" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "accounts"
          ADD CONSTRAINT "UQ_6e3463d04ac45234992daec9ff1" UNIQUE ("number")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "accounts"
          DROP CONSTRAINT "UQ_6e3463d04ac45234992daec9ff1"`
    );
    await queryRunner.query(`COMMENT ON COLUMN "accounts"."number" IS NULL`);
  }
}
