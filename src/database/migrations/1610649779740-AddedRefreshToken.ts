import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRefreshToken1610649779740 implements MigrationInterface {
  name = 'AddedRefreshToken1610649779740';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "refresh_tokens"
       (
           "id"         SERIAL    NOT NULL,
           "is_revoked" boolean   NOT NULL,
           "expires"    text      NOT NULL,
           "created_at" TIMESTAMP NOT NULL DEFAULT now(),
           "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
           CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id")
       )`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "refresh_token_pkey" ON "refresh_tokens" ("id") `
    );
    await queryRunner.query(
      `ALTER TABLE "users"
          ADD "refresh_token_id" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "users"
          ADD CONSTRAINT "UQ_6c9edee8fa924d444434b75423e" UNIQUE ("refresh_token_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "users"
          ADD CONSTRAINT "FK_6c9edee8fa924d444434b75423e" FOREIGN KEY ("refresh_token_id") REFERENCES "refresh_tokens" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users"
          DROP CONSTRAINT "FK_6c9edee8fa924d444434b75423e"`
    );
    await queryRunner.query(
      `ALTER TABLE "users"
          DROP CONSTRAINT "UQ_6c9edee8fa924d444434b75423e"`
    );
    await queryRunner.query(
      `ALTER TABLE "users"
          DROP COLUMN "refresh_token_id"`
    );
    await queryRunner.query(`DROP INDEX "refresh_token_pkey"`);
    await queryRunner.query(`DROP TABLE "refresh_tokens"`);
  }
}
