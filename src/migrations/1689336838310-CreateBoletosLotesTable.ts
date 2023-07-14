import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateBoletosLotesTable1689336838310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "boletos_lotes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "nome_lote",
                        type: "varchar",
                        length: "4",
                        isNullable: false
                    },
                    {
                        name: "id_lote",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: 'criado_em',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('boletos_lotes');
    }

}
