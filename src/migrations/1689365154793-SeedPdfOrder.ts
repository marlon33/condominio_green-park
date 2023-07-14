import { MigrationInterface, QueryRunner,TableForeignKey } from "typeorm"
import { AppDataSource } from "../database/db";
import PdfOrder from "../app/entities/PdfOrder";
import { PdfOrderSeed } from "../seeds/PdfOrder.seed"

export class SeedPdfOrder1689365154793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const PdfOrderRepository = AppDataSource.getRepository(PdfOrder);
        await PdfOrderRepository.save(
            PdfOrderSeed
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
