import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedSyntheticAccountEntity1610126488286
  implements MigrationInterface {
  name = 'AddedSyntheticAccountEntity1610126488286';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "synthetic_accounts"
       (
           "id"          SERIAL  NOT NULL,
           "number"      integer NOT NULL,
           "title"       text    NOT NULL,
           "description" text    NOT NULL,
           "account_id"  integer NOT NULL,
           CONSTRAINT "UQ_22b1ae10d82b18eacb840ee73f5" UNIQUE ("number"),
           CONSTRAINT "PK_d169a89a95f85fa270836f501e5" PRIMARY KEY ("id")
       )`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "synthetic_accounts_pkey" ON "synthetic_accounts" ("id") `
    );
    await queryRunner.query(
      `CREATE TABLE "synthetic_accounts_by_debit_accounts_synthetic_accounts"
       (
           "syntheticAccountsId_1" integer NOT NULL,
           "syntheticAccountsId_2" integer NOT NULL,
           CONSTRAINT "PK_c2807223d32fc380edaa86f7a68" PRIMARY KEY ("syntheticAccountsId_1", "syntheticAccountsId_2")
       )`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4337898223fc9b3c60887c08e0" ON "synthetic_accounts_by_debit_accounts_synthetic_accounts" ("syntheticAccountsId_1") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8b0636ee3d1e5fba5f0a5cb93d" ON "synthetic_accounts_by_debit_accounts_synthetic_accounts" ("syntheticAccountsId_2") `
    );
    await queryRunner.query(
      `CREATE TABLE "synthetic_accounts_by_credit_accounts_synthetic_accounts"
       (
           "syntheticAccountsId_1" integer NOT NULL,
           "syntheticAccountsId_2" integer NOT NULL,
           CONSTRAINT "PK_6808fe2946bfd7d71548e045d95" PRIMARY KEY ("syntheticAccountsId_1", "syntheticAccountsId_2")
       )`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6088c5b9fd89cbe179e3dd9afe" ON "synthetic_accounts_by_credit_accounts_synthetic_accounts" ("syntheticAccountsId_1") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4d02e7a779cea4a66bd96894a5" ON "synthetic_accounts_by_credit_accounts_synthetic_accounts" ("syntheticAccountsId_2") `
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts"
          ADD CONSTRAINT "FK_79e75fdad9a73c957a4df03b0ee" FOREIGN KEY ("account_id") REFERENCES "accounts" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts_by_debit_accounts_synthetic_accounts"
          ADD CONSTRAINT "FK_4337898223fc9b3c60887c08e05" FOREIGN KEY ("syntheticAccountsId_1") REFERENCES "synthetic_accounts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts_by_debit_accounts_synthetic_accounts"
          ADD CONSTRAINT "FK_8b0636ee3d1e5fba5f0a5cb93da" FOREIGN KEY ("syntheticAccountsId_2") REFERENCES "synthetic_accounts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts_by_credit_accounts_synthetic_accounts"
          ADD CONSTRAINT "FK_6088c5b9fd89cbe179e3dd9afe5" FOREIGN KEY ("syntheticAccountsId_1") REFERENCES "synthetic_accounts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts_by_credit_accounts_synthetic_accounts"
          ADD CONSTRAINT "FK_4d02e7a779cea4a66bd96894a55" FOREIGN KEY ("syntheticAccountsId_2") REFERENCES "synthetic_accounts" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts_by_credit_accounts_synthetic_accounts"
          DROP CONSTRAINT "FK_4d02e7a779cea4a66bd96894a55"`
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts_by_credit_accounts_synthetic_accounts"
          DROP CONSTRAINT "FK_6088c5b9fd89cbe179e3dd9afe5"`
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts_by_debit_accounts_synthetic_accounts"
          DROP CONSTRAINT "FK_8b0636ee3d1e5fba5f0a5cb93da"`
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts_by_debit_accounts_synthetic_accounts"
          DROP CONSTRAINT "FK_4337898223fc9b3c60887c08e05"`
    );
    await queryRunner.query(
      `ALTER TABLE "synthetic_accounts"
          DROP CONSTRAINT "FK_79e75fdad9a73c957a4df03b0ee"`
    );
    await queryRunner.query(`DROP INDEX "IDX_4d02e7a779cea4a66bd96894a5"`);
    await queryRunner.query(`DROP INDEX "IDX_6088c5b9fd89cbe179e3dd9afe"`);
    await queryRunner.query(
      `DROP TABLE "synthetic_accounts_by_credit_accounts_synthetic_accounts"`
    );
    await queryRunner.query(`DROP INDEX "IDX_8b0636ee3d1e5fba5f0a5cb93d"`);
    await queryRunner.query(`DROP INDEX "IDX_4337898223fc9b3c60887c08e0"`);
    await queryRunner.query(
      `DROP TABLE "synthetic_accounts_by_debit_accounts_synthetic_accounts"`
    );
    await queryRunner.query(`DROP INDEX "synthetic_accounts_pkey"`);
    await queryRunner.query(`DROP TABLE "synthetic_accounts"`);
  }
}
