import { MigrationInterface, QueryRunner } from 'typeorm';

export class MadeUserRefreshTokenConnectionNullable1610821731585
  implements MigrationInterface {
  name = 'MadeUserRefreshTokenConnectionNullable1610821731585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
        DROP CONSTRAINT "FK_6c9edee8fa924d444434b75423e"`);
    await queryRunner.query(`ALTER TABLE "users"
        ADD CONSTRAINT "FK_6c9edee8fa924d444434b75423e" FOREIGN KEY ("refresh_token_id") REFERENCES "refresh_tokens" ("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users"
        DROP CONSTRAINT "FK_6c9edee8fa924d444434b75423e"`);
    await queryRunner.query(`ALTER TABLE "users"
        ADD CONSTRAINT "FK_6c9edee8fa924d444434b75423e" FOREIGN KEY ("refresh_token_id") REFERENCES "refresh_tokens" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }
}
