import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangingTypeOfTheField1636896529941 implements MigrationInterface {
  name = 'ChangingTypeOfTheField1636896529941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "listOfActors"`);
    await queryRunner.query(`ALTER TABLE "film" ADD "listOfActors" jsonb NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "film" DROP COLUMN "listOfActors"`);
    await queryRunner.query(`ALTER TABLE "film" ADD "listOfActors" jsonb array NOT NULL`);
  }
}
