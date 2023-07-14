import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";
import { AppDataSource } from "../database/db";
import Lotes from "../app/entities/Lotes";
import { LotesSeed } from "../seeds/Lotes.seed"

export class SeedLotes1689336892240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const LotesRepository = AppDataSource.getRepository(Lotes);
        const boletosLotes = await LotesRepository.save(
            LotesSeed
        );

        await queryRunner.createForeignKey(
            'boletos_lotes',
            new TableForeignKey({
                columnNames: ['id_lote'],
                referencedColumnNames: ['id'],
                referencedTableName: 'lotes'
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
