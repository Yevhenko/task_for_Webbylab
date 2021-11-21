import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1637324888089 implements MigrationInterface {
    name = 'InitialMigration1637324888089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."film_formatofmovie_enum" AS ENUM('VHS', 'DVD', 'Blue-Ray')`);
        await queryRunner.query(`CREATE TABLE "film" ("id" SERIAL NOT NULL, "title" character varying(100) NOT NULL, "year" integer NOT NULL, "formatOfMovie" "public"."film_formatofmovie_enum" NOT NULL, "listOfActors" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_37ec0ffe0011ccbe438a65e3c6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "confirmPassword" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "film"`);
        await queryRunner.query(`DROP TYPE "public"."film_formatofmovie_enum"`);
    }

}
