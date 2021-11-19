import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1636983725098 implements MigrationInterface {
  name = 'InitialMigration1636983725098';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."film_formatofmovie_enum" AS ENUM('VHS', 'DVD', 'Blue-Ray')`);
    await queryRunner.query(
      `CREATE TABLE "film" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "productionYear" TIMESTAMP NOT NULL, "formatOfMovie" "public"."film_formatofmovie_enum" NOT NULL, "listOfActors" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "film"`);
    await queryRunner.query(`DROP TYPE "public"."film_formatofmovie_enum"`);
  }
}
