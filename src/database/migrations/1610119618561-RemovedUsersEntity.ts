import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemovedUsersEntity1610119618561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users"
       (
           "id"         uuid              NOT NULL DEFAULT uuid_generate_v4(),
           "email"      character varying NOT NULL,
           "name"       character varying          DEFAULT null,
           "password"   character varying NOT NULL,
           "created_at" TIMESTAMP         NOT NULL DEFAULT now(),
           "updated_at" TIMESTAMP         NOT NULL DEFAULT now(),
           CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
       )`
    );
  }
}
