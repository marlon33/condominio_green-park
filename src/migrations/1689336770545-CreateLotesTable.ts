import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateLotesTable1689336770545 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "lotes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "ativo",
                        type: "boolean",
                        default: true,
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
        await queryRunner.dropTable('lotes');
    }

}
