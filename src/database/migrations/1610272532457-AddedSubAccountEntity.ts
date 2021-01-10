import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedSubAccountEntity1610272532457 implements MigrationInterface {
  name = 'AddedSubAccountEntity1610272532457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sub_accounts"
       (
           "id"                   SERIAL  NOT NULL,
           "number"               text    NOT NULL,
           "title"                text    NOT NULL,
           "description"          text    NOT NULL,
           "synthetic_account_id" integer NOT NULL,
           CONSTRAINT "PK_d1b648d07f912395a898621a39c" PRIMARY KEY ("id")
       )`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "sub_accounts_pkey" ON "sub_accounts" ("id") `
    );
    await queryRunner.query(
      `ALTER TABLE "sub_accounts"
          ADD CONSTRAINT "FK_228156807955c69bf8544b1014c" FOREIGN KEY ("synthetic_account_id") REFERENCES "synthetic_accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sub_accounts"
          DROP CONSTRAINT "FK_228156807955c69bf8544b1014c"`
    );
    await queryRunner.query(`DROP INDEX "sub_accounts_pkey"`);
    await queryRunner.query(`DROP TABLE "sub_accounts"`);
  }
}
