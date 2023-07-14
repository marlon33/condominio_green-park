import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class CreateBoletosTable1689336796889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'boletos',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'nome_sacado',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'id_lote',
                        type: 'int',
                        isNullable: true
                    },
                    {
                        name: 'valor',
                        type: 'float',
                        precision: 10,
                        scale: 2,
                        isNullable: true
                    },
                    {
                        name: 'linha_digitavel',
                        type: 'varchar',
                        length: '255',
                        isNullable: true
                    },
                    {
                        name: 'ativo',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'criado_em',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP'
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'boletos',
            new TableForeignKey({
                columnNames: ['id_lote'],
                referencedColumnNames: ['id'],
                referencedTableName: 'lotes',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('boletos');
    }

}
