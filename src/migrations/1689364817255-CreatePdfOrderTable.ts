import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreatePdfOrderTable1689364817255 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pdf_order",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "id_lote",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "pdf_order",
                        type: "int",
                        length: "3",
                        isNullable: false
                    },
                    {
                        name: 'criado_em',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ]
            })
        );

        await queryRunner.createForeignKey(
            'pdf_order',
            new TableForeignKey({
                columnNames: ['id_lote'],
                referencedColumnNames: ['id'],
                referencedTableName: 'lotes',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pdf_order');
    }

}
