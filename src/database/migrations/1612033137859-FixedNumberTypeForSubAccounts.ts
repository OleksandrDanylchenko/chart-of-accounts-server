import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixedNumberTypeForSubAccounts1612033137859
  implements MigrationInterface {
  name = 'FixedNumberTypeForSubAccounts1612033137859';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sub_accounts" DROP COLUMN "number"`);
    await queryRunner.query(
      `ALTER TABLE "sub_accounts" ADD "number" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "sub_accounts" ADD CONSTRAINT "UQ_ad9c338eb17980588c9615444c5" UNIQUE ("number")`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_accounts" DROP CONSTRAINT "UQ_ad9c338eb17980588c9615444c5"`
    );
    await queryRunner.query(`ALTER TABLE "sub_accounts" DROP COLUMN "number"`);
    await queryRunner.query(
      `ALTER TABLE "sub_accounts" ADD "number" text NOT NULL`
    );
  }
}
