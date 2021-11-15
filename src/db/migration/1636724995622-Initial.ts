import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1636724995622 implements MigrationInterface {
    name = 'Initial1636724995622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "film" RENAME COLUMN "format" TO "formatOfMovie"`);
        await queryRunner.query(`ALTER TYPE "public"."film_format_enum" RENAME TO "film_formatofmovie_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."film_formatofmovie_enum" RENAME TO "film_format_enum"`);
        await queryRunner.query(`ALTER TABLE "film" RENAME COLUMN "formatOfMovie" TO "format"`);
    }

}
