import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedTypeOfAccountNumber1610120986652
  implements MigrationInterface {
  name = 'FixedTypeOfAccountNumber1610120986652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts"
        DROP CONSTRAINT "UQ_6e3463d04ac45234992daec9ff1"`);
    await queryRunner.query(`ALTER TABLE "accounts"
        DROP COLUMN "number"`);
    await queryRunner.query(`ALTER TABLE "accounts"
        ADD "number" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts"
        ADD CONSTRAINT "UQ_6e3463d04ac45234992daec9ff1" UNIQUE ("number")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts"
        DROP CONSTRAINT "UQ_6e3463d04ac45234992daec9ff1"`);
    await queryRunner.query(`ALTER TABLE "accounts"
        DROP COLUMN "number"`);
    await queryRunner.query(`ALTER TABLE "accounts"
        ADD "number" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "accounts"
        ADD CONSTRAINT "UQ_6e3463d04ac45234992daec9ff1" UNIQUE ("number")`);
  }
}
