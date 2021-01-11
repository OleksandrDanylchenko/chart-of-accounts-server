import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedUserEntity1610394698796 implements MigrationInterface {
  name = 'AddedUserEntity1610394698796';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users"
       (
           "id"         SERIAL    NOT NULL,
           "email"      text      NOT NULL,
           "password"   text      NOT NULL,
           "created_at" TIMESTAMP NOT NULL DEFAULT now(),
           "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
           CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
       )`
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "users_pkey" ON "users" ("id", "email") `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "users_pkey"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
