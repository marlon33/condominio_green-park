import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../database/db";
import BoletosLotes from "../app/entities/BoletosLotes";
import { BoletosLotesSeed } from "../seeds/BoletosLotes.seed"

export class SeedBoletosLotes1689336869321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const BoletosLotesRepository = AppDataSource.getRepository(BoletosLotes);
        const boletosLotes = await BoletosLotesRepository.save(
            BoletosLotesSeed
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
