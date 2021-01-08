import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccountsEntity1610115755921 implements MigrationInterface {
  name = 'AddAccountsEntity1610115755921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "accounts"
       (
           "id"          SERIAL NOT NULL,
           "number"      text   NOT NULL,
           "title"       text   NOT NULL,
           "description" text   NOT NULL,
           CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id")
       )`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "accounts_pkey" ON "accounts" ("id") `
    );
    await queryRunner.query(`COMMENT ON COLUMN "users"."name" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "users"
          ALTER COLUMN "name" SET DEFAULT null`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users"
          ALTER COLUMN "name" DROP DEFAULT`
    );
    await queryRunner.query(`COMMENT ON COLUMN "users"."name" IS NULL`);
    await queryRunner.query(`DROP INDEX "accounts_pkey"`);
    await queryRunner.query(`DROP TABLE "accounts"`);
  }
}
